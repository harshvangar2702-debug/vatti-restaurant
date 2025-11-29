import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { API_BASE_URL } from '../config';

gsap.registerPlugin(ScrollTrigger);

const reservationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  date: z.string().min(1, { message: 'Date is required' }),
  time: z.string().min(1, { message: 'Time is required' }),
  partySize: z.number().min(1, { message: 'Party size must be at least 1' }).max(12, { message: 'Party size cannot be more than 12' }),
  specialRequests: z.string().optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

interface ReservationProps {
  selectedPromotion: string | null;
}

const Reservation: React.FC<ReservationProps> = ({ selectedPromotion }) => {
  const reservationRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  useEffect(() => {
    if (selectedPromotion) {
      setValue('specialRequests', `Regarding promotion: ${selectedPromotion}`);
    }
  }, [selectedPromotion, setValue]);

  const onSubmit = async (data: ReservationFormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reservation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit reservation');
      }

      console.log('Reservation submitted successfully');
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('Failed to submit reservation.');
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".form-field", {
        scrollTrigger: {
          trigger: reservationRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.1
      });
    }, reservationRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={reservationRef} id="reservation" className="py-32 bg-gradient-to-br from-[#FAF9F6] to-[#F5F5DC] ">
      <div className="container mx-auto text-center">
        <h2 className="text-7xl font-bold mb-6 text-gray-800 font-modern-serif">Reserve Your Table</h2>
        <p className="mb-12 text-lg text-gray-600 font-modern-serif">We look forward to hosting you.</p>
        {isSubmitted ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative max-w-xl mx-auto" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Your reservation has been submitted. We will contact you shortly to confirm.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="form-field">
                <input type="text" placeholder="Name" {...register('name')} className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#E67E22]" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div className="form-field">
                <input type="email" placeholder="Email" {...register('email')} className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#E67E22]" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div className="form-field">
                <input type="tel" placeholder="Phone" {...register('phone')} className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#E67E22]" />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>
              <div className="form-field">
                <input type="date" {...register('date')} className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#E67E22]" />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
              </div>
              <div className="form-field">
                <input type="time" {...register('time')} className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#E67E22]" />
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
              </div>
              <div className="form-field">
                <input type="number" placeholder="Party Size" {...register('partySize', { valueAsNumber: true })} className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#E67E22]" />
                {errors.partySize && <p className="text-red-500 text-sm mt-1">{errors.partySize.message}</p>}
              </div>
            </div>
            <div className="form-field">
              <textarea placeholder="Special Requests" {...register('specialRequests')} className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-[#E67E22]"></textarea>
            </div>
            <button type="submit" className="bg-[#D4AF37] text-white py-4 px-10 rounded-full font-bold text-lg hover:bg-orange-500 transition-all duration-300 shadow-lg w-full transform hover:scale-105">Reserve Table</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Reservation;
