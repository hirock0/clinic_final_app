
import Image from "next/image";
const Faqs = () => {
  return (
    <div className=" my-14 max-w-[1440px] mx-auto w-11/12 gap-6 flex items-center lg:flex-row flex-col-reverse">
      <div className="w-full h-full">
        <Image src={"https://cdn.pixabay.com/photo/2024/10/07/13/00/unknown-9102980_960_720.jpg"} alt="poster" width={500} height={500}
        className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="space-y-4 w-full second-text-color">
        <div className="collapse collapse-plus bg-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-semibold uppercase">
            How can I place an order?
          </div>
          <div className="collapse-content">
            <p>
              {" "}
              Placing an order is simple! Browse through our wide range of
              medicines, add your desired products to the cart, and proceed to
              checkout. Fill in your shipping details, select your preferred
              payment method, and confirm your purchase.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-semibold uppercase">
            Are your medicines authentic and safe?
          </div>
          <div className="collapse-content">
            <p>
              {" "}
              Yes, all our medicines are 100% authentic and sourced from
              licensed manufacturers and distributors. We prioritize your safety
              and ensure proper storage and handling of all products.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-semibold uppercase">
            What are the available payment methods?
          </div>
          <div className="collapse-content">
            <p>
              We offer multiple payment options for your convenience, including
              credit/debit cards, mobile banking, and cash on delivery (where
              available). Your payment details are always secure with us.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-semibold uppercase">
            How long does delivery take?
          </div>
          <div className="collapse-content">
            <p>
              {" "}
              Delivery times vary based on your location. Typically, orders are
              delivered within 2–5 business days. For urgent requirements, we
              also offer express delivery options in select areas.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-300">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-semibold uppercase">
            Can I return or exchange a product?
          </div>
          <div className="collapse-content">
            <p>
              We accept returns or exchanges for damaged or incorrect items
              within 7 days of delivery. Please ensure the product is unused and
              in its original packaging. For assistance, contact our support
              team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
