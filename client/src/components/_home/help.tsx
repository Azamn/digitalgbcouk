const HelpSection = () => {
    return (
      <section className="bg-secondary text-primary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-center">
            <div>
              <h3 className="text-5xl font-bold">23+</h3>
              <p className="mt-2 text-lg">Projects Completed</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold">100+</h3>
              <p className="mt-2 text-lg">Clients Served</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold">325+</h3>
              <p className="mt-2 text-lg">Campaigns Run</p>
            </div>
          </div>
  
          {/* How we can help */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sm uppercase tracking-wide font-medium mb-2">
                Strategic, Action And Results Driven
              </p>
              <h2 className="text-4xl font-extrabold mb-4">
                How We Can Help You?
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                Transform your digital presence with tailored strategies and expert execution. From optimizing transactions to engaging customers, we drive results that matter to your business.
              </p>
              <button className="bg-black text-secondary py-3 px-6 rounded-lg font-semibold hover:bg-opacity-80 transition">
                CONNECT US
              </button>
            </div>
  
            {/* Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
              <ul className="space-y-4">
                <li>Social Media Domination</li>
                <li>Advertising Campaigns</li>
                <li>Lead Generation, Exposure & Brand Awareness</li>
              </ul>
              <ul className="space-y-4">
                <li>Brand Development</li>
                <li>More Customers & Build Brand Loyalty</li>
                <li>Videography and Photography</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default HelpSection;
  