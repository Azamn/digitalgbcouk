import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const cardsData = [
  {
    title: "Digital Advertisement",
    paragraph:
      "Enhance your brand's digital presence with our expert digital marketing strategies. We specialize in maximizing reach and engagement through innovative campaigns and proven tactics.",
    image: "/digital-market.png", // ✅ Correct path
  },
  {
    title: "Branding & Design",
    paragraph:
      "Transform your brand with our expert design team. We create compelling visual identities that resonate with your audience and establish a strong market presence.",
    image: "/digital-market.png", // ✅ Correct path
  },
  {
    title: "Social Media Management",
    paragraph:
      "Boost your online engagement and grow your community with our comprehensive social media management services. We create content that connects and converts.",
    image: "/digital-market.png", // ✅ Correct path
  },
];

const Cta = () => {
  return (
    <section className="relative mx-auto w-[80%] pb-20 font-lexend">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          What we do ?
        </h2>
        <div className="mx-auto max-w-2xl">
          <p className="text-xl">
            Winning strategy, creative excellence, and cutting-edge technology{" "}
            <span>our work is always results-driven</span>.
          </p>
        </div>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {cardsData.map((card, index) => (
            <CarouselItem key={index}>
              <div className="px-4">
                <Card className="bg-secondary overflow-hidden p-6 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-8 md:p-10">
                  <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                    {/* Content */}
                    <div className="flex flex-col justify-center space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                          {card.title}
                        </h3>
                        <p className="text-lg leading-relaxed text-gray-600">
                          {card.paragraph}
                        </p>
                      </div>
                    </div>

                    {/* Image */}
                    <Image
                      alt={card.title}
                      src={card.image}
                      height={400}
                      width={500}
                    />
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute -left-4 top-1/2 -translate-y-1/2">
          <CarouselPrevious className="bg-primary/80 hover:bg-primary h-12 w-12 rounded-full border-2 border-blue-600/20 backdrop-blur-sm transition-all hover:border-blue-600/40" />
        </div>
        <div className="absolute -right-4 top-1/2 -translate-y-1/2">
          <CarouselNext className="bg-primary/80 hover:bg-primary h-12 w-12 rounded-full border-2 border-blue-600/20 backdrop-blur-sm transition-all hover:border-blue-600/40" />
        </div>
      </Carousel>

      {/* Progress Indicators */}
      <div className="mt-8 flex justify-center gap-2">
        {cardsData.map((_, index) => (
          <div
            key={index}
            className="h-2 w-12 rounded-full bg-blue-600/20 transition-all duration-300 hover:bg-blue-600/40"
          />
        ))}
      </div>
    </section>
  );
};

export default Cta;
