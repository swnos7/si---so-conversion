import L from "leaflet";

export const company = {
  name: "SI & SO CONVERSIONS",
  logoLight: 'images/logo/LOGO.svg',
  phone1: "07763 739281",
  phone2: "07399 282178",
  email: "s.s.conversions@gmail.com",
  address: "Unit 37, Willian Industrial Estate, Salford, M50 2GR",
  coordinates: {
    lat: 53.4722,
    lng: -2.2936,
  },
};

export const navLinks = [
  { id: 'features', label: 'FEATURES' },
  { id: 'about', label: 'ABOUT' },
  { id: 'services', label: 'SERVICES' },
  { id: 'gallery', label: 'GALLERY' },
  { id: 'testimonials', label: 'TESTIMONIALS' },
  { id: 'team', label: 'TEAM' },
  { id: 'contact', label: 'CONTACT' }
];

export const features = [
  {
    icon: 'icons/Features/loft conversion black.svg',
    title: "Loft Conversions",
    description: "Transform unused attic space into beautiful, functional living areas."
  },
  {
    icon: 'icons/Features/home extension 2 black.svg',
    title: "Home Extensions",
    description: "Add space and value to your property with seamless, tailored extensions."
  },
  {
    icon: 'icons/Features/refurbishment black.svg',
    title: "Refurbishment",
    description: "Modernise and refresh your home with expert renovation work."
  }
];

export const services = [
  {
    icon: '/icons/services/electricity black.svg',
    title: "Electrical Work",
    description: "Safe, certified electrical installations and repairs, including lighting, rewiring, and fuse board upgrades all to UK standards."
  },
  {
    icon: '/icons/services/heating 2 black.svg',
    title: "Heating Systems",
    description: "Efficient installation and servicing of central heating systems, boilers, and radiators to keep your home warm and comfortable year-round."
  },
  {
    icon: '/icons/services/plumbing black.svg',
    title: "Plumbing Services",
    description: "Reliable plumbing solutions for kitchens, bathrooms, and general maintenance—delivered with care and precision."
  },
  {
    icon: '/icons/services/painting black.svg',
    title: "Interior & Exterior Painting",
    description: "High-quality painting and finishing that elevates your space, using durable, weather-appropriate materials for lasting results."
  },
  {
    icon: '/icons/services/carpentry black.svg',
    title: "Carpentry & Joinery",
    description: "Custom woodwork, from fitted furniture to structural joinery, crafted with expertise and attention to detail."
  },
  {
    icon: '/icons/services/roofing 2 black.svg',
    title: "Roof Repairs & Installation",
    description: "Professional roofing services including new installations, leak repairs, and maintenance—built to withstand the UK weather."
  }
];

export const galleryItems = [
    { src: 'images/portfolio/washroom%20done%20-%20Edited.jpg', title: "Bathroom", alt: "A beautifully converted loft space with modern furnishings" },
    { src: 'images/portfolio/woodsbackyard.jpg', title: "Landscape", alt: "Exterior view of a modern house conversion" },
    { src: 'images/portfolio/floorrepair.jpg', title: "Modern Flooring", alt: "Sleek and modern wooden flooring in a living room" },
    { src: 'images/portfolio/washroombuild.jpg', title: "Exterior Work", alt: "Side view of a house with new exterior cladding and windows" },
    { src: 'images/portfolio/indiansstairs.jpg', title: "Modern Interior", alt: "Bright and airy modern interior with minimalist furniture" },
    { src: 'images/portfolio/bathroom%2012%20-%20Edited.jpg', title: "Bathroom Design", alt: "Stylish bathroom with a walk-in shower and modern tiles" },
    { src: 'images/portfolio/bathroom%20done%20-%20Edited.jpg', title: "Luxury Bathroom", alt: "A luxury bathroom with a freestanding tub and marble walls" },
    { src: 'images/portfolio/floorrwfur.jpg', title: "Flooring", alt: "Spacious kitchen extension with a large island and skylights" },
    { src: 'images/portfolio/guardingcamp.jpg', title: "Storage", alt: "A landscaped garden with a new patio and outdoor seating area" }
];

export const testimonials = [
  {
    text: "Working with Si & So Conversions was a game-changer for our business. Their professionalism and attention to detail ensured our project was completed on time and exceeded expectations.",
    author: "John Doe"
  },
  {
    text: "Exceptional quality and service. The team transformed our space beyond what we imagined possible. Highly recommend their expertise.",
    author: "Sarah Johnson"
  },
  {
    text: "From start to finish, Si & So Conversions delivered outstanding results. Their commitment to excellence is evident in every aspect of their work.",
    author: "Michael Brown"
  }
];

export const directors = [
  {
    name: "J. Silva",
    title: "Operations Director",
    email: "s.s.conversions@gmail.com",
    phone: "+44 07399 282178",
    image: 'images/logo/LOGO.svg'
  },
  {
    name: "H. Sousa",
    title: "Operations Director",
    email: "s.s.conversions@gmail.com",
    phone: "+44 07763 739281",
    image: 'images/logo/Si&So.svg'
  }
];

export const socialLinks = [
  { icon: 'Facebook', href: "https://www.facebook.com/profile.php?id=61577343973264", name: "Facebook" },
  { icon: 'Instagram', href: "https://www.instagram.com/sisoconversions/", name: "Instagram" },
  { icon: 'WhatsApp', href: "https://wa.me/+4407763739281?text=Hi%21%20I'm%20interested%20in%20a%20quote%20from%20SI%20%26%20SO%20Conversions.%20Here's%20a%20bit%20about%20my%20project%3A%0A- Type of work%3A%20%5Be.g.%20loft%20conversion%2C%20kitchen%20renovation%5D%0A- Location%3A%20%5Byour%20postcode%20or%20area%5D%0A- Preferred date%3A%20%5Boptional%5D%0A%0ALooking%20forward%20to%20your%20reply%21", name: "WhatsApp" },
 {
  icon: 'Email',
  href: `mailto:s.s.conversions@gmail.com?subject=Quote%20Request%20–%20SI%20%26%20SO%20Conversions&body=Hi%20SI%20%26%20SO%20Conversions,%0A%0AI’m%20interested%20in%20receiving%20a%20quote%20for%20a%20building%20project.%0A%0AHere%20are%20a%20few%20details%3A%0A- Type of work%3A%20%5Be.g.%20loft%20conversion%2C%20kitchen%20renovation%5D%0A- Property location%3A%20%5Bpostcode%20or%20area%5D%0A- Preferred start date%3A%20%5Boptional%5D%0A- Additional notes%3A%20%5Bbrief%20project%20details%5D%0A%0APlease%20let%20me%20know%20if%20you%20need%20more%20information.%20I%20look%20forward%20to%20your%20response!%0A%0AKind%20regards,%0A%5BYour%20Name%5D`,
  name: "Email"
}
];

export const whyChooseUs = [
  "Experienced Leadership",
  "Reliable & On Time",
  "Certified Professionals",
  "Transparent Process",
  "Sustainable Building",
  "Client Satisfaction",
  "Full Project Management",
  "Locally Trusted"
];
export const customIcon = new L.Icon({
  iconUrl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128" xml:space="preserve"><path style="fill:#539dd6" d="M66.441 4.883c-25.941 0-46.971 21.03-46.971 46.971C19.47 95.71 64 126.498 64 126.498s46.971-32.875 46.971-78.306c0-25.941-18.588-43.309-44.53-43.309zM65.221 85.5c-20.604 0-37.307-16.703-37.307-37.308 0-20.603 16.703-37.307 37.307-37.307 20.604 0 37.306 16.704 37.306 37.307 0 20.605-16.703 37.308-37.306 37.308z"/><path style="fill:#4692c1" d="M64 126.498s46.971-32.875 46.971-78.306c0-25.941-19.485-44.454-46.971-43.247v7.161c20.604 0 36.086 15.483 36.086 36.087 0 20.604-15.482 36.087-36.086 36.087v42.218z"/><circle style="fill:#ba8a8c" cx="64" cy="48.193" r="36.006"/><path style="fill:#1e1e1e" d="m63.983 128-.706-.517c-.474-.348-47.469-35.325-47.469-79.29C15.808 21.619 37.427 0 64 0s48.192 21.619 48.192 48.192c0 45.54-47.016 78.973-47.492 79.306l-.717.502zM64 2.441c-25.226 0-45.751 20.524-45.751 45.751 0 39.797 39.927 72.252 45.766 76.782 5.874-4.371 45.735-35.576 45.735-76.782C109.751 22.965 89.226 2.441 64 2.441zm0 82.98c-20.527 0-37.227-16.7-37.227-37.229 0-20.527 16.7-37.227 37.227-37.227s37.227 16.7 37.227 37.227c0 20.528-16.7 37.229-37.227 37.229zm0-72.015c-19.181 0-34.786 15.605-34.786 34.786C29.214 67.374 44.819 82.98 64 82.98s34.786-15.606 34.786-34.788c0-19.181-15.605-34.786-34.786-34.786z"/><g><path style="fill:#ffc176" d="M89.412 48.6h-7.016v19.145H72.99V55.481H57.451v12.265H48.04V48.6h-7.016c-.883 0-1.091-.504-.457-1.128l23.5-23.017a1.66 1.66 0 0 1 2.302 0l23.506 23.017c.634.624.426 1.128-.463 1.128z"/><path style="fill:#1e1e1e" d="M90.728 46.6 67.222 23.58a2.89 2.89 0 0 0-4.01.002L39.71 46.602c-.956.94-.747 1.803-.614 2.13s.59 1.088 1.927 1.088h5.795v19.146h11.853V56.701h13.097v12.265h11.848V49.82h5.795c1.341 0 1.797-.762 1.932-1.089.135-.327.344-1.19-.615-2.131zM74.21 66.525V54.26H56.231v12.265H49.26v-17.41l15.96-15.516 15.955 15.516v17.41H74.21zm8.682-19.146L65.221 30.194 47.546 47.378l-5.134-.004L64.92 25.329a.44.44 0 0 1 .597-.002l22.51 22.052h-5.135z"/></g></svg>', // pode ser um arquivo local ou link externo
  iconSize: [80, 60], // tamanho do ícone (largura, altura)
  iconAnchor: [30, 40], // ponto do ícone que ficará no ponto do mapa (meio base)
  popupAnchor: [0, -40], // ponto para abrir o popup em relação ao ícone
});
