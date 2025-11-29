import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { API_BASE_URL } from '../config';

const reviewSchema = z.object({
  user: z.string().min(2, 'Name must be at least 2 characters'),
  stars: z.number().min(1, 'Please select a rating').max(5),
  text: z.string().min(10, 'Review must be at least 10 characters').max(500, 'Review must not exceed 500 characters'),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export default function ReviewSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [hoverRating, setHoverRating] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      user: '',
      stars: 0,
      text: '',
    },
  });

  const stars = watch('stars');

  const onSubmit = async (data: ReviewFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitMessage(null);

      const response = await fetch(`${API_BASE_URL}/api/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit review');
      }

      setSubmitMessage({
        type: 'success',
        text: 'Thank you! Your review has been submitted and is pending approval.',
      });
      reset();
      setHoverRating(0);
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to submit review. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl mb-12">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Share Your Experience</h3>
      <p className="text-gray-600 mb-6">We'd love to hear about your dining experience at Vatti!</p>

      {submitMessage && (
        <div
          className={`mb-6 p-4 rounded-lg ${submitMessage.type === 'success'
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-red-100 text-red-700 border border-red-300'
            }`}
        >
          {submitMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div className="form-field">
          <input
            {...register('user')}
            type="text"
            placeholder="Your Name"
            className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
          />
          {errors.user && <p className="text-red-500 text-sm mt-1">{errors.user.message}</p>}
        </div>

        {/* Rating Field */}
        <div className="form-field">
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => {
                  setValue('stars', star);
                }}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <span
                  className={`text-3xl transition-colors ${star <= (hoverRating || stars) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                >
                  ★
                </span>
              </button>
            ))}
          </div>
          {stars > 0 && <p className="text-sm text-gray-600 mt-1">{stars} out of 5 stars</p>}
          {errors.stars && <p className="text-red-500 text-sm mt-1">{errors.stars.message}</p>}
        </div>

        {/* Comment Field */}
        <div className="form-field">
          <textarea
            {...register('text')}
            placeholder="Tell us about your experience..."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E67E22] resize-none"
          />
          {errors.text && <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>}
          <p className="text-gray-500 text-sm mt-1">{watch('text').length}/500 characters</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#D4AF37] text-white py-4 px-10 rounded-full font-bold text-lg hover:bg-orange-500 transition-all duration-300 shadow-lg w-full transform hover:scale-105"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>

      <p className="text-gray-500 text-sm mt-6 text-center">
        Your review will appear on our website after our team approves it. Thank you for your feedback!
      </p>
    </div>
  );
}
