import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Text, Container } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import "@mantine/carousel/styles.css";

const slides = [
  {
    title: "Welcome to \n Oyasave",
    subtitle: "Lets get started on your \n savings journey",
    image: "/piggybank.svg"
  },
  {
    title: "Stay in control of \nyour savings",
    subtitle: "Effortlessly manage \n your finances",
    image: "/savings.svg"
  },
  {
    title: "Track progress, \n save. Thrive",
    subtitle: "Set goals, track habits \n celebrate milestones",
    image: "/progresssavings.svg"
  }
];

const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const emblaRef = useRef<EmblaCarouselType>(null);

  const handleNext = () => {
    if (activeSlide === slides.length - 1) {
      navigate("/signin");
    } else {
      emblaRef.current?.scrollNext();
    }
  };

  return (
    <Box className="min-h-dvh flex justify-center items-center font-aeonik">
      <Container size="xs" p={0} className="w-full h-full md:h-auto">
        <Box 
          className="w-full min-h-dvh md:min-h-[620px] max-w-[400px] px-6 py-10 md:py-8 flex flex-col justify-between overflow-hidden mx-auto bg-white"
        >
          {/* Brand */}
          <Text className="text-center! text-[24px]! md:text-[28px]! font-bold! text-[#1f5f5b]! mt-4! md:mt-2! mb-12!">
            OyaSave
          </Text>

          {/* Slide Content */}
          <Box className="flex-1 flex flex-col justify-center items-center">
            <Carousel
              withControls={false}
              withIndicators={false}
              height="auto"
              onSlideChange={setActiveSlide}
              getEmblaApi={(embla) => { emblaRef.current = embla; }}
              className="w-full max-w-[342px]"
              // align="center"
              slideSize="100%"
            >
              {slides.map((slide, index) => (
                <Carousel.Slide key={index}>
                  <Box className="flex flex-col items-center w-full">
                    {/* Illustration */}
                    <Box className="flex justify-center mb-6 w-full h-[228px]">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-contain"
                      />
                    </Box>

                    {/* Text Content */}
                    <Box className="text-center! mb-6">
                      <Text className="text-[24px]! md:text-[26px]! font-bold! text-[#393F4A]! mb-3! leading-[1.2]! mt-12!">
                        {slide.title.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < slide.title.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </Text>
                      <Text className="text-[16px]! text-[#475467]! leading-normal! font-normal! font-aeonik">
                        {slide.subtitle.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < slide.subtitle.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </Text>
                    </Box>
                  </Box>
                </Carousel.Slide>
              ))}
            </Carousel>

            {/* Pagination Dots */}
            <Box className="flex justify-center gap-[6px] mb-4">
              {slides.map((_, i) => (
                <Box
                  key={i}
                  onClick={() => emblaRef.current?.scrollTo(i)}
                  className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${
                    i === activeSlide ? "bg-[#1f5f5b]" : "bg-[#D9D9D9]"
                  }`}
                />
              ))}
            </Box>
          </Box>

          <Box className="flex justify-center mt-2 mb-4">
            <Button 
              size="lg"
              className="w-[180px]! bg-[#44A1A0]! hover:bg-[#3b8c8b]! text-white! rounded-[12px]! h-12! text-[16px]! font-medium! transition-all! active:scale-[0.98]!"
              onClick={handleNext}
            >
              {activeSlide === slides.length - 1 ? "Get Started" : "Next"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default OnboardingScreen;
