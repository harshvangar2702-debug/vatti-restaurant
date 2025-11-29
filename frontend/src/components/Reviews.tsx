import React from "react";
import Slider from "react-slick";
import "./Reviews.css";
import ReviewSubmission from "./ReviewSubmission";

import SarahJohnsonAvatar from "../assets/Sarah Johnson.png";
import MichaelChenAvatar from "../assets/Michael Chen.png";
import EmilyRodriguezAvatar from "../assets/Emily Rodriguez.png";
import DavidThompsonAvatar from "../assets/David Thompson.png";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: SarahJohnsonAvatar,
      rating: 5,
      date: "2 weeks ago",
      review:
        "Absolutely incredible dining experience! The Spaghetti Carbonara was divine and the service was impeccable. Will definitely be returning!",
      platform: "Google",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: MichaelChenAvatar,
      rating: 5,
      date: "1 month ago",
      review:
        "Best Italian restaurant in town! The ambiance is cozy and the Tiramisu is to die for. Highly recommend for date nights.",
      platform: "Yelp",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: EmilyRodriguezAvatar,
      rating: 4,
      date: "3 weeks ago",
      review:
        "Great food and wonderful atmosphere. The Bruschetta was fresh and delicious. Service was friendly and attentive.",
      platform: "TripAdvisor",
    },
    {
      id: 4,
      name: "David Thompson",
      avatar: DavidThompsonAvatar,
      rating: 5,
      date: "2 days ago",
      review:
        "Exceptional quality! Every dish we tried was bursting with authentic Italian flavors. The chef really knows their craft.",
      platform: "Google",
    },
    {
      id: 5,
      name: "Sarah Johnson",
      avatar: SarahJohnsonAvatar,
      rating: 5,
      date: "2 weeks ago",
      review:
        "Absolutely incredible dining experience! The Spaghetti Carbonara was divine and the service was impeccable. Will definitely be returning!",
      platform: "Google",
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "star-filled" : "star-empty"}>
          ★
        </span>
      );
    }
    return stars;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          spaceBetween: 25,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          spaceBetween: 20,
        }
      }
    ]
  };

  return (
    <section id="reviews" className="py-32 bg-gradient-to-br from-[#FAF9F6] to-[#F5F5DC]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-7xl font-bold mb-6 text-gray-800 font-modern-serif">What Our Guests Say</h2>
          <p className="text-xl text-gray-600 font-modern-serif">Real reviews from real diners</p>
        </div>
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review.id} className="review-card-wrapper">
              <div className="review-card">
                <div className="reviewer-info">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="reviewer-avatar"
                  />
                  <div>
                    <div className="reviewer-name">{review.name}</div>
                    <div className="review-date">{review.date}</div>
                  </div>
                </div>
                <div className="review-rating">{renderStars(review.rating)}</div>
                <p className="review-text">"{review.review}"</p>
                <div className="review-platform">From {review.platform}</div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Review Submission Form - Heading */}
        <h3 className="text-2xl md:text-4xl font-bold text-gray-800 font-modern-serif text-center mt-20 mb-2">Share Your Experience</h3>
        <p className="text-center text-gray-600 mb-8">We'd love to hear about your dining experience at Vatti!</p>

        {/* Review Submission Form */}
        <div className="mt-12">
          <ReviewSubmission />
        </div>
      </div>
    </section>
  );
};

export default Reviews;
