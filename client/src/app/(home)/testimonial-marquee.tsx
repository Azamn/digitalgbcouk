import { Marquee } from "@/components/ui/magicui/marquee";
import { cn } from "@/lib/utils";

// Dummy testimonials for your app (feel free to swap the text out)
const testimonials = [
  {
    name: "Alice",
    username: "@alice",
    body: "This app has completely changed how I manage my tasks. Incredible!",
    img: "https://avatar.vercel.sh/alice",
  },
  {
    name: "Bob",
    username: "@bob",
    body: "Clean, simple, and super effective. I use it every single day.",
    img: "https://avatar.vercel.sh/bob",
  },
  {
    name: "Charlie",
    username: "@charlie",
    body: "I love how intuitive the interface is. Everything just makes sense.",
    img: "https://avatar.vercel.sh/charlie",
  },
  {
    name: "Dana",
    username: "@dana",
    body: "Customer support is fantastic and the features are top-notch!",
    img: "https://avatar.vercel.sh/dana",
  },
  {
    name: "Ethan",
    username: "@ethan",
    body: "I never thought managing my workflow could be this easy. Game changer!",
    img: "https://avatar.vercel.sh/ethan",
  },
  {
    name: "Fiona",
    username: "@fiona",
    body: "A seamless experience from start to finish. Highly recommended.",
    img: "https://avatar.vercel.sh/fiona",
  },
  {
    name: "George",
    username: "@george",
    body: "Super slick design with powerful features. Absolutely love it!",
    img: "https://avatar.vercel.sh/george",
  },
  {
    name: "Hannah",
    username: "@hannah",
    body: "The app has boosted my productivity more than I expected!",
    img: "https://avatar.vercel.sh/hannah",
  },
  {
    name: "Ian",
    username: "@ian",
    body: "I can't imagine going back to how I worked before this app.",
    img: "https://avatar.vercel.sh/ian",
  },
  {
    name: "Jasmine",
    username: "@jasmine",
    body: "Finally an app that gets what users really need!",
    img: "https://avatar.vercel.sh/jasmine",
  },
];

const TestimonialCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-72 cursor-pointer overflow-hidden rounded-2xl border p-6 shadow-md",
        "border-gray-900/[0.1] bg-secondary hover:bg-gray-50",
        "dark:border-white/[0.1] dark:bg-gray-900 dark:hover:bg-gray-800",
        "transition-all duration-300 ease-in-out",
      )}
    >
      <blockquote className="mb-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
        {body}
      </blockquote>

      <div className="flex flex-col">
        <figcaption className="text-sm font-semibold text-gray-900 dark:text-secondary">
          {name}
        </figcaption>
        <p className="text-xs text-gray-500 dark:text-gray-400">{username}</p>
      </div>
    </figure>
  );
};

export function TestimonialsMarquee() {
  return (
    <section className="bg-background text-foreground relative mx-auto w-[90%] py-16">
      <h2 className="mb-8 text-center text-3xl font-bold">
        What People are Saying ?
      </h2>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:300s]">
          {testimonials.map((review) => (
            <TestimonialCard key={review.username} {...review} />
          ))}
        </Marquee>

        {/* Optional gradient fades */}
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l"></div>
      </div>
    </section>
  );
}

export default TestimonialsMarquee;
