import { createContext, useContext, useState } from 'react'

export const LanguageContext = createContext()

export const translations = {
    en: {
        // Navbar
        nav_home: 'Home',
        nav_all_doctors: 'All Doctors',
        nav_about: 'About',
        nav_contact: 'Contact',
        nav_create_account: 'Create Account',
        nav_my_profile: 'My Profile',
        nav_my_appointments: 'My Appointments',
        nav_logout: 'Logout',
        nav_admin_portal: 'Admin Portal',
        nav_doctor_portal: 'Doctor Portal',

        // Header
        header_badge: '100+ Trusted Doctors Available',
        header_title_1: 'Book Your',
        header_title_2: 'Appointment',
        header_title_3: 'Instantly',
        header_subtitle: 'Browse our extensive list of trusted doctors and schedule your appointment hassle-free.',
        header_btn_book: 'Book Appointment',
        header_btn_explore: 'Explore Specialities',
        header_stat_doctors: 'Doctors',
        header_stat_patients: 'Patients',
        header_stat_rating: 'Rating',
        header_stat_support: 'Support',

        // Speciality Menu
        spec_badge: 'Browse by Category',
        spec_title_1: 'Find by',
        spec_title_2: 'Speciality',
        spec_subtitle: 'Simply browse through our extensive list of trusted doctors, schedule your appointment hassle free.',

        // Top Doctors
        top_badge: 'Our Experts',
        top_title_1: 'Top Doctors to',
        top_title_2: 'Book',
        top_subtitle: 'Simply browse through our extensive list of trusted doctors.',
        top_available: 'Available',
        top_view_all: 'View All Doctors',

        // Banner
        banner_title_1: 'Book Appointment',
        banner_title_2: 'With 100+ Trusted Doctors',
        banner_subtitle: "Whether it's a routine check-up or specialist consultation — we've got you covered.",
        banner_btn_book: 'Book Appointment',
        banner_btn_explore: 'Explore Doctors',
        banner_patients: 'Patients',
        banner_success: 'Success Rate',
        banner_support: 'Support',

        // Footer
        footer_tagline: 'Your trusted partner in managing your healthcare needs conveniently and efficiently.',
        footer_company: 'Company',
        footer_links: ['Home', 'About Us', 'Delivery', 'Privacy Policy'],
        footer_get_in_touch: 'Get in Touch',
        footer_rights: 'All Rights Reserved.',
        footer_made_with: 'Made with ❤️ in India',

        // Login
        login_create: 'Create Account',
        login_welcome: 'Welcome Back',
        login_create_subtitle: 'Sign up to book your appointment',
        login_welcome_subtitle: 'Log in to your account',
        login_name: 'Full Name',
        login_email: 'Email Address',
        login_password: 'Password',
        login_forgot: 'Forgot Password?',
        login_google: 'Continue with Google',
        login_email_divider: 'or continue with email',
        login_btn_create: '🚀 Create Account',
        login_btn_login: '🔓 Login',
        login_have_account: 'Already have an account?',
        login_login_here: 'Login here',
        login_new_here: 'New here?',
        login_create_acc: 'Create account',

        // About
        about_badge: 'Who We Are',
        about_title: 'About',
        about_subtitle: 'Your trusted partner in managing your healthcare needs conveniently and efficiently.',
        about_img_badge_value: '100+',
        about_img_badge_label: 'Trusted Doctors',
        about_heading: 'Healthcare Made',
        about_heading_2: 'Simple',
        about_p1: 'Welcome to TicketCounter, your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges individuals face when it comes to scheduling doctor appointments and managing health records.',
        about_p2: 'We are committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service.',
        about_tags: ['Verified Doctors', 'Secure Records', 'Easy Booking', 'Fast Support'],
        about_stats: [
            { value: '10k+', label: 'Patients Served' },
            { value: '100+', label: 'Expert Doctors' },
            { value: '4.9★', label: 'Average Rating' },
            { value: '24/7', label: 'Support' },
        ],
        about_values_badge: 'What Drives Us',
        about_values_title: 'Our Core',
        about_values_title_2: 'Values',
        about_values: [
            { icon: '🎯', title: 'Our Mission', desc: 'To make quality healthcare accessible to everyone through seamless technology.' },
            { icon: '👁️', title: 'Our Vision', desc: 'Bridge the gap between patients and providers, making healthcare effortless.' },
            { icon: '💡', title: 'Innovation', desc: 'Continuously evolving our platform with latest advancements in health tech.' },
        ],

        // Contact
        contact_badge: 'Get in Touch',
        contact_title: 'Contact',
        contact_subtitle: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
        contact_info: [
            { icon: '📍', title: 'Our Office', info: 'Saket Nagar, Deoria\nBhatwallia Nath Nagar Choraha' },
            { icon: '📞', title: 'Phone', info: '+91 7007301900' },
            { icon: '✉️', title: 'Email', info: 'nikhildixit525@gmail.com' },
        ],
        contact_form_title: 'Send a Message 💬',
        contact_name_label: 'Your Name',
        contact_email_label: 'Email Address',
        contact_msg_label: 'Message',
        contact_msg_placeholder: 'Write your message here...',
        contact_btn: '🚀 Send Message',
        contact_btn_sent: '✅ Message Sent!',
        contact_careers_badge: 'Join Our Team',
        contact_careers_title: 'Careers at TicketCounter',
        contact_careers_sub: 'Learn more about our teams and job openings.',
        contact_careers_btn: 'Explore Jobs →',

        // Appointment page
        appt_available: 'Available Today',
        appt_rating: 'Rating',
        appt_patients: 'Patients',
        appt_select_slot: '📅 Select Appointment Slot',
        appt_book_btn: '✅ Book Appointment',
        appt_booked_btn: '🎉 Appointment Booked! Check My Appointments',
        appt_select_first: 'Select a time slot first',
        appt_fee: 'Appointment Fee',

        // MyProfile
        profile_title: 'Patient Account',
        profile_contact: 'Contact Information',
        profile_basic: 'Basic Information',
        profile_email: 'Email',
        profile_phone: 'Phone',
        profile_gender: 'Gender',
        profile_dob: 'Date of Birth',
        profile_edit: '✏️ Edit Profile',
        profile_save: '✅ Save Changes',
        profile_cancel: 'Cancel',
        profile_male: 'Male',
        profile_female: 'Female',
        profile_other: 'Other',

        // MyAppointments
        myappt_badge: 'Dashboard',
        myappt_title: 'My',
        myappt_title_2: 'Appointments',
        myappt_subtitle: 'Manage and track all your upcoming appointments.',
        myappt_total: 'Total',
        myappt_upcoming: 'Upcoming',
        myappt_completed: 'Completed',
        myappt_pay: '💳 Pay Online',
        myappt_cancel: '✕ Cancel',
    },

    hi: {
        // Navbar
        nav_home: 'होम',
        nav_all_doctors: 'सभी डॉक्टर',
        nav_about: 'हमारे बारे में',
        nav_contact: 'संपर्क करें',
        nav_create_account: 'खाता बनाएं',
        nav_my_profile: 'मेरी प्रोफाइल',
        nav_my_appointments: 'मेरी अपॉइंटमेंट',
        nav_logout: 'लॉग आउट',
        nav_admin_portal: 'एडमिन पोर्टल',
        nav_doctor_portal: 'डॉक्टर पोर्टल',

        // Header
        header_badge: '100+ विश्वसनीय डॉक्टर उपलब्ध',
        header_title_1: 'बुक करें अपनी',
        header_title_2: 'अपॉइंटमेंट',
        header_title_3: 'तुरंत',
        header_subtitle: 'हमारे विश्वसनीय डॉक्टरों की सूची देखें और बिना किसी परेशानी के अपॉइंटमेंट बुक करें।',
        header_btn_book: 'अपॉइंटमेंट बुक करें',
        header_btn_explore: 'विशेषज्ञता देखें',
        header_stat_doctors: 'डॉक्टर',
        header_stat_patients: 'मरीज़',
        header_stat_rating: 'रेटिंग',
        header_stat_support: 'सहायता',

        // Speciality Menu
        spec_badge: 'श्रेणी के अनुसार खोजें',
        spec_title_1: 'विशेषज्ञता',
        spec_title_2: 'से खोजें',
        spec_subtitle: 'हमारे विश्वसनीय डॉक्टरों की विस्तृत सूची देखें और बिना किसी परेशानी के अपॉइंटमेंट बुक करें।',

        // Top Doctors
        top_badge: 'हमारे विशेषज्ञ',
        top_title_1: 'शीर्ष डॉक्टर',
        top_title_2: 'बुक करें',
        top_subtitle: 'हमारे विश्वसनीय डॉक्टरों की विस्तृत सूची देखें।',
        top_available: 'उपलब्ध',
        top_view_all: 'सभी डॉक्टर देखें',

        // Banner
        banner_title_1: 'अपॉइंटमेंट बुक करें',
        banner_title_2: '100+ विश्वसनीय डॉक्टरों के साथ',
        banner_subtitle: 'चाहे नियमित जांच हो या विशेषज्ञ परामर्श — हम आपकी मदद के लिए तैयार हैं।',
        banner_btn_book: 'अपॉइंटमेंट बुक करें',
        banner_btn_explore: 'डॉक्टर देखें',
        banner_patients: 'मरीज़',
        banner_success: 'सफलता दर',
        banner_support: 'सहायता',

        // Footer
        footer_tagline: 'आपकी स्वास्थ्य देखभाल की ज़रूरतों को सुविधाजनक और कुशलतापूर्वक प्रबंधित करने में आपका विश्वसनीय साथी।',
        footer_company: 'कंपनी',
        footer_links: ['होम', 'हमारे बारे में', 'डिलीवरी', 'गोपनीयता नीति'],
        footer_get_in_touch: 'संपर्क करें',
        footer_rights: 'सर्वाधिकार सुरक्षित।',
        footer_made_with: '❤️ से बना, भारत में',

        // Login
        login_create: 'खाता बनाएं',
        login_welcome: 'वापस स्वागत है',
        login_create_subtitle: 'अपॉइंटमेंट बुक करने के लिए साइन अप करें',
        login_welcome_subtitle: 'अपने खाते में लॉग इन करें',
        login_name: 'पूरा नाम',
        login_email: 'ईमेल पता',
        login_password: 'पासवर्ड',
        login_forgot: 'पासवर्ड भूल गए?',
        login_google: 'Google से जारी रखें',
        login_email_divider: 'या ईमेल से जारी रखें',
        login_btn_create: '🚀 खाता बनाएं',
        login_btn_login: '🔓 लॉग इन करें',
        login_have_account: 'पहले से खाता है?',
        login_login_here: 'यहाँ लॉग इन करें',
        login_new_here: 'नए हैं?',
        login_create_acc: 'खाता बनाएं',

        // About
        about_badge: 'हम कौन हैं',
        about_title: 'हमारे बारे में',
        about_subtitle: 'आपकी स्वास्थ्य देखभाल की ज़रूरतों को सुविधाजनक रूप से प्रबंधित करने में आपका विश्वसनीय साथी।',
        about_img_badge_value: '100+',
        about_img_badge_label: 'विश्वसनीय डॉक्टर',
        about_heading: 'स्वास्थ्य सेवा',
        about_heading_2: 'सरल बनाई',
        about_p1: 'TicketCounter में आपका स्वागत है। हम आपकी स्वास्थ्य देखभाल की ज़रूरतों को सुविधाजनक और कुशलतापूर्वक प्रबंधित करने में आपके विश्वसनीय साथी हैं।',
        about_p2: 'हम स्वास्थ्य तकनीक में उत्कृष्टता के लिए प्रतिबद्ध हैं और लगातार अपने प्लेटफॉर्म को बेहतर बनाने का प्रयास कर रहे हैं।',
        about_tags: ['सत्यापित डॉक्टर', 'सुरक्षित रिकॉर्ड', 'आसान बुकिंग', 'तेज़ सहायता'],
        about_stats: [
            { value: '10k+', label: 'मरीज़ सेवित' },
            { value: '100+', label: 'विशेषज्ञ डॉक्टर' },
            { value: '4.9★', label: 'औसत रेटिंग' },
            { value: '24/7', label: 'सहायता' },
        ],
        about_values_badge: 'हमारी प्रेरणा',
        about_values_title: 'हमारे मूल',
        about_values_title_2: 'मूल्य',
        about_values: [
            { icon: '🎯', title: 'हमारा मिशन', desc: 'सहज तकनीक के माध्यम से सभी के लिए गुणवत्तापूर्ण स्वास्थ्य सेवा सुलभ बनाना।' },
            { icon: '👁️', title: 'हमारी दृष्टि', desc: 'मरीज़ों और डॉक्टरों के बीच की दूरी कम करना और स्वास्थ्य सेवा को आसान बनाना।' },
            { icon: '💡', title: 'नवाचार', desc: 'स्वास्थ्य तकनीक में नवीनतम प्रगति के साथ अपने प्लेटफॉर्म को लगातार विकसित करना।' },
        ],

        // Contact
        contact_badge: 'संपर्क करें',
        contact_title: 'संपर्क',
        contact_subtitle: 'हम आपसे सुनना पसंद करेंगे। हमें एक संदेश भेजें और हम जल्द से जल्द जवाब देंगे।',
        contact_info: [
            { icon: '📍', title: 'हमारा कार्यालय', info: 'सकेत नगर, देवरिया\nभटवलिया नाथ नगर चौराहा' },
            { icon: '📞', title: 'फ़ोन', info: '+91 7007301900' },
            { icon: '✉️', title: 'ईमेल', info: 'nikhildixit525@gmail.com' },
        ],
        contact_form_title: 'संदेश भेजें 💬',
        contact_name_label: 'आपका नाम',
        contact_email_label: 'ईमेल पता',
        contact_msg_label: 'संदेश',
        contact_msg_placeholder: 'यहाँ अपना संदेश लिखें...',
        contact_btn: '🚀 संदेश भेजें',
        contact_btn_sent: '✅ संदेश भेजा गया!',
        contact_careers_badge: 'हमारी टीम से जुड़ें',
        contact_careers_title: 'TicketCounter में करियर',
        contact_careers_sub: 'हमारी टीमों और नौकरी के अवसरों के बारे में जानें।',
        contact_careers_btn: 'नौकरियां देखें →',

        // Appointment page
        appt_available: 'आज उपलब्ध',
        appt_rating: 'रेटिंग',
        appt_patients: 'मरीज़',
        appt_select_slot: '📅 अपॉइंटमेंट स्लॉट चुनें',
        appt_book_btn: '✅ अपॉइंटमेंट बुक करें',
        appt_booked_btn: '🎉 अपॉइंटमेंट बुक हो गई! मेरी अपॉइंटमेंट देखें',
        appt_select_first: 'पहले एक समय स्लॉट चुनें',
        appt_fee: 'परामर्श शुल्क',

        // MyProfile
        profile_title: 'मरीज़ खाता',
        profile_contact: 'संपर्क जानकारी',
        profile_basic: 'बुनियादी जानकारी',
        profile_email: 'ईमेल',
        profile_phone: 'फ़ोन',
        profile_gender: 'लिंग',
        profile_dob: 'जन्म तिथि',
        profile_edit: '✏️ प्रोफाइल संपादित करें',
        profile_save: '✅ बदलाव सहेजें',
        profile_cancel: 'रद्द करें',
        profile_male: 'पुरुष',
        profile_female: 'महिला',
        profile_other: 'अन्य',

        // MyAppointments
        myappt_badge: 'डैशबोर्ड',
        myappt_title: 'मेरी',
        myappt_title_2: 'अपॉइंटमेंट',
        myappt_subtitle: 'अपनी सभी आगामी अपॉइंटमेंट प्रबंधित और ट्रैक करें।',
        myappt_total: 'कुल',
        myappt_upcoming: 'आगामी',
        myappt_completed: 'पूर्ण',
        myappt_pay: '💳 ऑनलाइन भुगतान करें',
        myappt_cancel: '✕ रद्द करें',
    }
}

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('en')
    const t = (key) => translations[lang][key] || translations['en'][key] || key

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLang = () => useContext(LanguageContext)
