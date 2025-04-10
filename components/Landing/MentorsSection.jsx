"use client";
import { Container, Typography, Card, CardContent } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const mentors = [
  {
    name: "John Doe",
    expertise: "Senior Software Engineer at Google",
    image: "/images/john_doe.jpg",
  },
  {
    name: "Jane Smith",
    expertise: "Lead Data Analyst at Amazon",
    image: "/images/jane_smith.jpg",
  },
  {
    name: "Michael Lee",
    expertise: "Mobile App Specialist at Meta",
    image: "/images/michael_lee.jpg",
  },
];

export default function MentorsSection() {
  return (
    <Container id="mentors-section" sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h4" fontWeight={700} color="#106861" gutterBottom>
        Meet Our Mentors
      </Typography>

      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Autoplay, Pagination]}
        style={{ marginTop: 20 }}
      >
        {mentors.map((mentor, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                p: 2,
                textAlign: "center",
                boxShadow: 3,
                background: "#F5F5F5",
              }}
            >
              <CardContent>
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginBottom: "10px",
                  }}
                />
                <Typography variant="h6" fontWeight={600}>
                  {mentor.name}
                </Typography>
                <Typography variant="body2">{mentor.expertise}</Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
