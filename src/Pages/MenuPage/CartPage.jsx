import React, { Fragment } from "react";
import Footer from "../../component/Elements/Footer/Footer";
import { Link } from "react-router-dom";
import Cart from "../../component/Elements/CartOrder/Cart";
import { addToCart } from "../../Store/AddToCart";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router-dom";
import Star from "../../component/Elements/Icon/Star";

const CartProduct = () => {
  const [cartItems] = addToCart(useShallow((state) => [state.cartItems]));
  const count = cartItems.length;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="w-full bg-[#1f3933] text-[#ffffff]">
        <div className="md:fixed py-4 px-2 md:px-6 md:h-screen">
          <div className="flex items-end">
            {/* Logo */}
            <svg fill="#ffffff" height="40px" width="40px" className="hidden md:block mr-3" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 425.762 425.762" xmlSpace="preserve">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path d="M424.938,360.253c-1.585-3.657-5.19-6.023-9.176-6.023h-90.591c9.831-10.514,18.209-22.385,24.735-35.159 c11.113-21.758,16.749-45.262,16.749-69.86c0-5.523-4.478-10-10-10H69.103c-5.522,0-10,4.477-10,10 c0,4.156,0.175,8.277,0.496,12.367h-24.96c-6.708,0-13.002,2.611-17.711,7.338c-4.731,4.732-7.338,11.022-7.338,17.711 c0,26.286,21.38,47.67,47.66,47.67h27.536c4.705,7.056,10.002,13.729,15.802,19.933H10c-3.985,0-7.591,2.367-9.176,6.023 c-1.584,3.657-0.847,7.906,1.879,10.814c19.007,20.284,45.851,31.917,73.648,31.917H349.41c27.797,0,54.641-11.633,73.648-31.917 C425.784,368.16,426.522,363.91,424.938,360.253z M29.589,286.627c0-1.347,0.525-2.615,1.494-3.583 c0.941-0.946,2.204-1.466,3.555-1.466h27.859c2.405,11.249,6.087,22.179,11.028,32.72H57.249 C41.997,314.297,29.589,301.884,29.589,286.627z M79.466,259.211h266.825c-2.732,37.482-20.782,71.547-50.553,95.019h-165.72 C100.248,330.758,82.197,296.693,79.466,259.211z M349.41,382.985H76.352c-12.784,0-25.318-3.069-36.558-8.755h346.173 C374.728,379.916,362.195,382.985,349.41,382.985z"></path> <path d="M145.989,131.572l51.064,24.204c15.341,7.271,25.243,22.328,25.843,39.293c0.191,5.399,4.628,9.647,9.987,9.646 c0.12,0,0.24-0.002,0.36-0.006c5.52-0.195,9.835-4.828,9.641-10.347c-0.865-24.464-15.145-46.174-37.265-56.659l-51.064-24.204 c-17.468-8.28-24.942-29.227-16.663-46.694c4.011-8.462,11.077-14.855,19.896-18.002c8.82-3.147,18.336-2.672,26.798,1.339 c4.993,2.367,10.954,0.238,13.319-4.753c2.365-4.991,0.237-10.954-4.753-13.319c-13.288-6.299-28.236-7.045-42.087-2.103 c-13.851,4.943-24.947,14.983-31.246,28.272C106.818,85.672,118.557,118.569,145.989,131.572z"></path> <path d="M231.852,52.583c13.909-13.424,36.146-13.027,49.57,0.881c13.408,13.893,13.03,36.094-0.832,49.523l-36.009,33.749 c-4.029,3.777-4.234,10.105-0.457,14.135c1.968,2.101,4.63,3.162,7.298,3.162c2.451,0,4.907-0.896,6.837-2.704l36.065-33.802 c0.035-0.034,0.07-0.067,0.105-0.101c21.845-21.082,22.465-56.005,1.383-77.85s-56.006-22.465-77.85-1.383 c-3.974,3.835-4.087,10.166-0.251,14.14C221.546,56.306,227.879,56.418,231.852,52.583z"></path> <path d="M201.273,195.224c4.628-3.014,5.937-9.209,2.923-13.837s-9.209-5.938-13.837-2.923 c-11.672,7.601-17.405,21.826-14.268,35.396l1.063,4.599c1.069,4.623,5.184,7.75,9.734,7.75c0.746,0,1.504-0.084,2.262-0.259 c5.381-1.245,8.734-6.615,7.49-11.996l-1.063-4.599C194.324,203.937,196.613,198.259,201.273,195.224z"></path>{" "}
                </g>{" "}
              </g>
            </svg>
            {/* Arrow back */}
            <Link to={"/menu"} className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <h3 className="hidden md:block font-semibold ml-1">Back To Menu</h3>
            </Link>
          </div>
          <div className="w-full h-full flex items-center px-3 py-4">
            <div className="flex">
              <h1 className="text-2xl font-bold">Review Order ({count})</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="bg-[#eaeaea] min-h-screen w-full flex flex-col items-center justify-center">{count >= 1 ? <>{Array.isArray(cartItems) && cartItems.map((cart, index) => <Cart key={index} product={cart} name={cart.name} _id={cart} />)}</> : <Order />}</div>
        <div className="">
          <Footer />
        </div>
      </div>
    </section>
  );
};

const Order = () => {
  const Navigate = useNavigate();

  return (
    <Fragment>
      <div className="flex flex-col px-4 max-w-sm md:max-w-lg gap-4">
        <Star />
        <h1 className="font-semibold text-4xl">Start your next order</h1>
        <h3 className="font-extralight text-lg">As you add menu items, they'll appear here. You'll have a chance to review before placing your order.</h3>
        <button className="w-32 h-12 rounded-full border border-[#cba258]" onClick={()=> Navigate('/menu')}>Add Items</button>
      </div>
    </Fragment>
  );
};

export default CartProduct;
