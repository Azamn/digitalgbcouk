import { Marquee } from "@/components/ui/magicui/marquee";
import { cn } from "@/lib/utils";

const reviews = [
  {
    img: "./1.png",
  },
  {
    img: "./2.png",
  },
  {
    img: "./3.png",
  },
  {
    img: "./4.png",
  },
  {
    img: "./5.png",
  },
];

const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative flex cursor-pointer overflow-hidden rounded-xl p-4 shadow-lg",
      )}
    >
      <img src={img} alt="Instagram" />
    </figure>
  );
};

export function ClientMarquee() {
  return (
    <section className="relative mx-auto w-[90%] py-16 font-lexend">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Our frequent Clients ?
      </h2>
      <Marquee pauseOnHover className="[--duration:7s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.img} img={review.img} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l"></div>
    </section>
  );
}

export default ClientMarquee;
