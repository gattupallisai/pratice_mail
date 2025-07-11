
'use client';
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, MailCheck, Rocket,SmilePlus,CloudLightning,CheckCircle2,Mail,Phone, MapPin,Gift,Percent} from 'lucide-react';
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    CreditCard,
} from 'lucide-react';
import { FaSignInAlt, FaUserCheck, FaCreditCard, FaReceipt } from "react-icons/fa";
import { FaShieldAlt, FaRocket, FaInbox, FaUsers, FaCloud, FaTools } from "react-icons/fa";


const services = [
  {
    icon: FaShieldAlt,
    title: "Secure Communication",
    desc: "Industry-leading encryption keeps your emails and data safe from threats.",
  },
  {
    icon: FaRocket,
    title: "Lightning Fast Delivery",
    desc: "Emails sent and received in milliseconds with powerful delivery engines.",
  },
  {
    icon: FaInbox,
    title: "Smart Inbox",
    desc: "Organize, filter, and prioritize emails with AI-based automation.",
  },
  {
    icon: FaUsers,
    title: "Team Collaboration",
    desc: "Share inboxes, assign tasks, and manage workflows with your team.",
  },
  {
    icon: FaCloud,
    title: "Cloud Sync",
    desc: "Access emails anywhere with real-time sync across all devices.",
  },
  {
    icon: FaTools,
    title: "Custom Tools",
    desc: "Advanced customizations and integrations tailored to your workflow.",
  },
];

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

const steps = [
  {
    title: "Login",
    desc: "Go to CQ Mail login page and enter your credentials.",
    icon: FaSignInAlt,
  },
  {
    title: "Authenticate",
    desc: "Verify your identity and access your dashboard.",
    icon: FaUserCheck,
  },
  {
    title: "Select Plan",
    desc: "Choose the subscription plan that fits your needs.",
    icon: FaCreditCard,
  },
  {
    title: "Complete Payment",
    desc: "Enter your payment details and confirm your purchase.",
    icon: FaReceipt,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
};
const features = [
    {
        title: 'Enterprise-grade Security',
        description: 'Top-tier encryption and data privacy for all your communication.',
        icon: ShieldCheck,
    },
    {
        title: 'Lightning Fast Delivery',
        description: 'Send and receive emails with ultra-low latency.',
        icon: Rocket,
    },
    {
        title: 'User Delight Experience',
        description: 'Designed for seamless and enjoyable user interactions.',
        icon: SmilePlus,
    },
    {
        title: 'Cloud Optimized',
        description: 'Fully scalable, always available cloud infrastructure.',
        icon: CloudLightning,
    },
];

const pricingPlans = [
    {
        title: 'Starter',
        price: 'Free',
        features: [
            '10 GB Storage',
            'Basic Inbox Filters',
            'Single User Access',
            'Email Notifications',
        ],
        popular: false,
    },
    {
        title: 'Pro',
        price: '$9.99/mo',
        features: [
            '100 GB Storage',
            'Smart Inbox & Filters',
            'Priority Support',
            'Team Collaboration',
            'Advanced Security',
        ],
        popular: true,
    },
    {
        title: 'Enterprise',
        price: 'Custom',
        features: [
            'Unlimited Storage',
            'Admin Dashboard',
            'Advanced Analytics',
            'Dedicated Manager',
            'Custom Integrations',
        ],
        popular: false,
    },
];

export default function HeroSection() {
   const router = useRouter();
    return (
        <div className='overflow-hidden'>
            <section className="relative px-6 py-24 overflow-hidden bg-white" id="hero">
                {/* Blue background glow */}
                <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-blue-500 opacity-20 blur-[120px] rounded-full z-0" />

                <div className="relative z-10 grid items-center gap-5 mx-auto ml-10 max-w-7xl md:grid-cols-2">
                    {/* LEFT SIDE — ADVANCED TEXT */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        viewport={{ once: true }}
                        className="max-w-xl text-left"
                    >
                        <h1 className="text-4xl font-extrabold leading-tight text-black md:text-5xl">
                            Experience the <br />
                            <span className="text-transparent bg-gradient-to-r from-blue-600 via-black to-blue-600 bg-clip-text">
                                Future of Email
                            </span>
                            <br />
                            with <span className="text-blue-600">CamelQ Mail</span>
                        </h1>

                        <p className="max-w-md mt-4 text-base text-gray-700">
                            Seamlessly manage your inbox with AI-powered organization, voice commands, and bulletproof security — all wrapped in a sleek, modern interface.
                        </p>

                            <div className="flex gap-6 mt-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/login")}
        className="inline-block px-8 py-3 font-semibold text-white transition bg-blue-600 rounded-full shadow-lg hover:bg-blue-700"
      >
        Connect Domain
      </motion.button>

                           <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/login")}
        className="inline-block px-8 py-3 font-semibold text-blue-600 transition border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white"
      >
        Learn More
      </motion.button>
    </div>

                        {/* Feature mini list with icons */}
                        <motion.ul
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="max-w-sm mt-8 space-y-4"
                        >
                            <li className="flex items-center gap-3 text-gray-700">
                                <Sparkles className="w-6 h-6 text-blue-600" />
                                <span className="font-medium">Smart AI sorting & smart replies</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <ShieldCheck className="w-6 h-6 text-blue-600" />
                                <span className="font-medium">End-to-end encrypted & secure</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <MailCheck className="w-6 h-6 text-blue-600" />
                                <span className="font-medium">Lightning fast delivery & sync</span>
                            </li>
                        </motion.ul>
                    </motion.div>

                    {/* RIGHT SIDE — IMAGE with floating cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="relative w-full max-w-md mx-auto"
                    >
                        <img
                            src="https://media.istockphoto.com/id/1457994875/vector/young-woman-with-laptop-reading-or-writing-emails-messages-chats-online-business.jpg?s=612x612&w=0&k=20&c=2WRKocUIohgmO9gUARshXo3rxNVfoGx_uac-Yi0MiMA="
                            alt="CamelQ Mail UI"
                            className="w-full border border-blue-100 rounded-3xl"
                        />

                        {/* Floating cards around the image (clean, no shadow) */}
                        <div className="absolute top-[-40px] left-[-40px] bg-white border border-blue-200 p-3 rounded-xl flex items-center gap-3 w-48">
                            <Sparkles className="w-6 h-6 text-blue-600" />
                            <div>
                                <p className="font-semibold text-black">AI Inbox</p>
                                <p className="text-xs text-gray-500">Smart sorting & replies</p>
                            </div>
                        </div>

                        <div className="absolute bottom-[-50px] right-[-30px] bg-white border border-blue-200 p-3 rounded-xl flex items-center gap-3 w-52">
                            <ShieldCheck className="w-6 h-6 text-blue-600" />
                            <div>
                                <p className="font-semibold text-black">Secure Mail</p>
                                <p className="text-xs text-gray-500">End-to-end encrypted</p>
                            </div>
                        </div>

                        <div className="absolute top-[60%] left-[-60px] bg-white border border-blue-200 p-3 rounded-xl flex items-center gap-3 w-44">
                            <MailCheck className="w-6 h-6 text-blue-600" />
                            <div>
                                <p className="font-semibold text-black">Instant Delivery</p>
                                <p className="text-xs text-gray-500">Reliable & fast</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
         <section id="features" className="px-6 py-20 bg-white">
            <div className="mx-auto text-center max-w-7xl">
                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-gray-900"
                >
                    Powerful <span className="text-blue-600">Features</span> You&apos;ll Love
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-xl mx-auto mt-4 mb-16 text-gray-600"
                >
                    CamelQ Mail gives you everything you need to manage your communication easily and securely.
                </motion.p>

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="p-6 transition-all duration-300 bg-white border border-gray-200 shadow-sm group rounded-xl hover:shadow-md"
                        >
                            <div className="flex items-center justify-center mx-auto mb-4 text-blue-600 transition-all duration-300 bg-blue-100 rounded-full w-14 h-14 group-hover:bg-blue-600 group-hover:text-white">
                                <feature.icon size={28} />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
            <section className="px-6 py-20 bg-white" id="pricing">
            <div className="mx-auto max-w-7xl">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl font-bold text-black">
                        Choose Your <span className="text-blue-600">Plan</span>
                    </h2>
                    <p className="max-w-xl mx-auto mt-4 text-lg text-gray-600">
                        Flexible pricing built to scale with your email needs.
                    </p>
                </div>

                <div className="grid gap-10 md:grid-cols-3">
                    {pricingPlans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            className={`border rounded-2xl p-8 transition-all shadow-sm hover:shadow-lg ${
                                plan.popular
                                    ? 'border-blue-600 bg-black text-white'
                                    : 'border-gray-200 bg-white text-black'
                            }`}
                        >
                            <h3 className="mb-4 text-2xl font-semibold">{plan.title}</h3>
                            <p className="mb-6 text-3xl font-bold">
                                {plan.price === 'Free' || plan.price === 'Custom' ? (
                                    plan.price
                                ) : (
                                    <>
                                        <span className="text-blue-600">{plan.price.split('/')[0]}</span>
                                        <span className="text-sm text-gray-500"> /mo</span>
                                    </>
                                )}
                            </p>
                            <ul className="mb-6 space-y-3">
                                {plan.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-3">
                                        <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-blue-600'}`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`w-full py-2 mt-4 rounded-lg font-medium transition-colors ${
                                    plan.popular
                                        ? 'bg-white text-black hover:bg-gray-200'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                {plan.price === 'Custom' ? 'Contact Us' : 'Get Started'}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
       <section className="px-6 py-20 bg-gradient-to-r from-blue-50 to-blue-100">
      <h2 className="text-5xl font-extrabold text-center text-blue-900 mb-14 drop-shadow-md">
        How to Login & Make Payment
      </h2>

      <motion.div
        className="relative flex flex-col items-center justify-between max-w-6xl mx-auto md:flex-row"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Steps */}
        {steps.map(({ title, desc, icon: Icon }, i) => (
          <motion.div
            key={i}
            variants={stepVariants}
            className="relative z-10 flex flex-col items-center px-4 mb-12 text-center md:w-1/4 md:mb-0"
          >
            {/* Step circle */}
            <div className="flex items-center justify-center w-20 h-20 text-white transition bg-blue-600 rounded-full shadow-lg cursor-default hover:bg-blue-700">
              <Icon size={32} />
            </div>

            {/* Step number badge */}
            <div className="absolute text-lg font-bold text-blue-600 -bottom-6">
              Step {i + 1}
            </div>

            {/* Title */}
            <h3 className="mt-8 mb-3 text-xl font-semibold text-blue-800">{title}</h3>

            {/* Description */}
            <p className="max-w-xs text-blue-700">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
     <section className="px-6 py-20 bg-white">
      <div className="mx-auto mb-16 text-center max-w-7xl">
        <h2 className="mb-4 text-4xl font-extrabold text-blue-800 md:text-5xl">What Services We Provide</h2>
        <p className="max-w-2xl mx-auto text-lg text-blue-600">
          Powerful features tailored for your professional communication.
        </p>
      </div>

      <div className="grid max-w-6xl grid-cols-1 gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, title, desc }, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariant}
            className="flex flex-col items-center p-8 text-center transition shadow-md bg-blue-50 hover:bg-blue-100 rounded-xl"
          >
            <div className="p-4 mb-4 text-blue-700 bg-white rounded-full shadow">
              <Icon size={32} />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-blue-800">{title}</h3>
            <p className="text-sm text-blue-700">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
        <section className="px-6 py-16 mx-auto bg-white max-w-7xl">
  <div className="grid items-center gap-12 md:grid-cols-2">
    {/* Left Side - Contact Info */}
    <div className="space-y-8">
      <h2 className="text-4xl font-extrabold text-blue-600">
        Get in Touch with CQ Mail
      </h2>
      <p className="max-w-lg text-gray-700">
        We&apos;re here to help you 24/7. Whether you have questions or need support,
        reach out anytime. We value your feedback and are eager to assist.
      </p>

      <div className="space-y-6">
        <div className="flex items-center gap-4 text-gray-800">
          <MapPin size={28} className="text-blue-600" />
          <span>Hyderabad, Telangana, India</span>
        </div>
        <div className="flex items-center gap-4 text-gray-800">
          <Mail size={28} className="text-blue-600" />
          <a href="mailto:support@cqmail.com" className="transition hover:text-blue-600">
            support@cqmail.com
          </a>
        </div>
        <div className="flex items-center gap-4 text-gray-800">
          <Phone size={28} className="text-blue-600" />
          <a href="tel:+919100135545" className="transition hover:text-blue-600">
            +91 567937901333
          </a>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-2xl font-semibold text-blue-600">Follow Us</h3>
        <div className="flex gap-6 text-gray-600">
          <a
            href="https://facebook.com/cqmail"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-blue-600"
            aria-label="Facebook"
          >
            <Facebook size={28} />
          </a>
          <a
            href="https://twitter.com/cqmail"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-blue-600"
            aria-label="Twitter"
          >
            <Twitter size={28} />
          </a>
          <a
            href="https://instagram.com/cqmail"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-blue-600"
            aria-label="Instagram"
          >
            <Instagram size={28} />
          </a>
          <a
            href="https://linkedin.com/company/cqmail"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-blue-600"
            aria-label="LinkedIn"
          >
            <Linkedin size={28} />
          </a>
          <a
            href="https://youtube.com/cqmail"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-blue-600"
            aria-label="YouTube"
          >
            <Youtube size={28} />
          </a>
        </div>
      </div>
    </div>

  {/* Right Side - Image */}
<div className="flex justify-center">
  <img
    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
    alt="Contact Support Illustration"
    className="rounded-2xl border-4 border-blue-500 shadow-[0_10px_30px_rgba(59,130,246,0.5)] transition-transform hover:scale-105 duration-300 max-w-full h-auto object-cover"
    loading="lazy"
  />
</div>

  </div>
</section>
  <section className="relative px-6 py-20 bg-gradient-to-r from-blue-50 to-white">
      <div className="grid items-center max-w-6xl gap-16 mx-auto md:grid-cols-2">
        {/* Left - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="inline-flex items-center px-4 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full shadow-sm w-fit">
            <Gift className="w-5 h-5 mr-2" /> Limited Time Offer
          </div>

          <h2 className="text-4xl font-extrabold leading-tight text-blue-900">
            First-Time Login? <br />
            Get <span className="text-blue-600">70% Off</span> on Email & Domain!
          </h2>

          <p className="text-lg text-blue-700">
            Sign up now and enjoy massive savings on our premium email services and custom domain plans. Perfect for businesses, creators, and teams.
          </p>

          <button className="px-6 py-3 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
            Claim Your 70% Off
          </button>
        </motion.div>

        {/* Right - Animated Icon or Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="max-w-sm p-8 space-y-6 text-center bg-white border border-blue-100 shadow-lg rounded-2xl">
            <div className="flex items-center justify-center w-20 h-20 mx-auto text-blue-700 bg-blue-100 rounded-full shadow">
              <Percent size={36} />
            </div>
            <h3 className="text-xl font-bold text-blue-800">Unlock Premium</h3>
            <p className="text-sm text-blue-600">
              Get the best deals on email & domain for your business. Start your journey with CQ Mail now!
            </p>
          </div>
        </motion.div>
      </div>
    </section>  
        
         <footer className="text-black bg-white border-t border-gray-200">
            <div className="grid gap-10 px-6 py-12 mx-auto max-w-7xl md:grid-cols-5 sm:grid-cols-2">
                {/* Brand & Description */}
                <div className="md:col-span-2">
                    <h2 className="mb-4 text-3xl font-extrabold text-blue-600">CQ Mail</h2>
                    <p className="mb-6 text-gray-600">
                        The smartest, fastest, and most secure email platform designed for modern teams and individuals.
                    </p>

                    {/* Payment Methods */}
                    <div>
                        <h4 className="mb-3 text-lg font-semibold">We Accept</h4>
                        <div className="flex items-center space-x-4">
                            <CreditCard size={28} className="text-blue-600" />
                            <img
                                src="https://img.icons8.com/color/48/000000/visa.png"
                                alt="Visa"
                                className="h-8"
                            />
                            <img
                                src="https://img.icons8.com/color/48/000000/mastercard.png"
                                alt="Mastercard"
                                className="h-8"
                            />
                            <img
                                src="https://img.icons8.com/color/48/000000/amex.png"
                                alt="Amex"
                                className="h-8"
                            />
                            <img
                                src="https://img.icons8.com/color/48/000000/paypal.png"
                                alt="Paypal"
                                className="h-8"
                            />
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
                    <ul className="space-y-3 text-gray-700">
                        <li>
                            <a href="#hero" className="transition hover:text-blue-600">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#features" className="transition hover:text-blue-600">
                                Features
                            </a>
                        </li>
                        <li>
                            <a href="#pricing" className="transition hover:text-blue-600">
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a href="#whyus" className="transition hover:text-blue-600">
                                Why Choose Us
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="transition hover:text-blue-600">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="mb-4 text-lg font-semibold">Support</h4>
                    <ul className="space-y-3 text-gray-700">
                        <li>
                            <a href="#" className="transition hover:text-blue-600">
                                Help Center
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition hover:text-blue-600">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition hover:text-blue-600">
                                Terms of Service
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition hover:text-blue-600">
                                System Status
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact & Subscribe */}
                <div>
                    <h4 className="mb-4 text-lg font-semibold">Contact & Subscribe</h4>
                    <div className="mb-6 space-y-4 text-gray-700">
                        <p className="flex items-center gap-2">
                            <Mail size={18} className="text-blue-600" />
                            support@cqmail.com
                        </p>
                        <p className="flex items-center gap-2">
                            <Phone size={18} className="text-blue-600" />
                            +91 567937901333
                        </p>
                        <p className="flex items-start gap-2">
                            <MapPin size={18} className="mt-1 text-blue-600" />
                            Hyderabad, Telangana, India
                        </p>
                    </div>

                    {/* Social Media */}
                    <div className="flex gap-5 mt-8 text-gray-600">
                        <a
                            href="https://facebook.com/cqmail"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition hover:text-blue-600"
                            aria-label="Facebook"
                        >
                            <Facebook size={24} />
                        </a>
                        <a
                            href="https://twitter.com/cqmail"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition hover:text-blue-600"
                            aria-label="Twitter"
                        >
                            <Twitter size={24} />
                        </a>
                        <a
                            href="https://instagram.com/cqmail"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition hover:text-blue-600"
                            aria-label="Instagram"
                        >
                            <Instagram size={24} />
                        </a>
                        <a
                            href="https://linkedin.com/company/cqmail"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition hover:text-blue-600"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={24} />
                        </a>
                        <a
                            href="https://youtube.com/cqmail"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition hover:text-blue-600"
                            aria-label="YouTube"
                        >
                            <Youtube size={24} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="py-4 text-sm text-center text-white bg-blue-600">
                © {new Date().getFullYear()} CQ Mail. All rights reserved.
            </div>
        </footer>
        </div>
    );
}
