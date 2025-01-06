$(document).ready(function () {
    const teamSlider = $('.team-slider');
    const size = 5; // Number of items to show per slide

    // Local team data (dummy data for illustration)
    const teamData = [
        { name: 'Supriya Gadekar', role: 'Faculty Advisor', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', bg: '#a4b0be' },
        { name: 'Sanidhya', role: 'GDG Organizer', avatar: 'https://randomuser.me/api/portraits/men/7.jpg', bg: '#f3f3f3' },
        { name: 'Aryan', role: 'Co Organizer', avatar: 'https://randomuser.me/api/portraits/men/10.jpg', bg: '#f3f3f3' },
        { name: 'Mehvish', role: 'Event Manager', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', bg: '#dfe4ea' },
        { name: 'Kunal', role: 'Event Manager', avatar: 'https://randomuser.me/api/portraits/men/6.jpg', bg: '#dfe4ea' },
        { name: 'Ajinkya', role: 'Web Developer', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', bg: '#dfe4ea' },
        { name: 'Ashutosh', role: 'Web Developer', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', bg: '#a4b0be' },
        { name: 'Devavrat', role: 'AI/ML Head', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', bg: '#f3f3f3' },
        { name: 'Shreya', role: 'Android Developer', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', bg: '#a4b0be' },
        { name: 'Kushal', role: 'Android Developer', avatar: 'https://randomuser.me/api/portraits/men/8.jpg', bg: '#dfe4ea' },
        { name: 'Vedant', role: 'Graphic Designer', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', bg: '#f3f3f3' },
        { name: 'Shubham', role: 'Graphic Designer', avatar: 'https://randomuser.me/api/portraits/men/11.jpg', bg: '#a4b0be' },
        { name: 'Arya', role: 'Content Creator', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', bg: '#f3f3f3' },
        { name: 'Atharv', role: 'Flutter Head', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', bg: '#dfe4ea' },
        { name: 'Vedant', role: 'Social Media & Outreach Manager', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', bg: '#dfe4ea' },
        { name: 'Anay', role: 'Social Media & Outreach Manager', avatar: 'https://randomuser.me/api/portraits/men/9.jpg', bg: '#a4b0be' },
    ];


    // Create team member HTML
    function createMemberCard(member) {
        return `
            <div class="team-member">
                <div class="member-card">
                    <div class="member-image-container" style="background: ${member.bg}">
                        <img class="member-avatar" src="${member.avatar}" alt="${member.name}">
                    </div>
                    <div class="member-info">
                        <div class="member-name">${member.name}</div>
                        <div class="member-role">${member.role}</div>
                    </div>
                </div>
            </div>
        `;
    }

    // Initialize slider
    function initializeSlider() {
        // Create slides
        const slides = [];
        for (let i = 0; i < teamData.length; i += size) {
            const slideMembers = teamData.slice(i, i + size);
            const slideHTML = slideMembers.map(member => createMemberCard(member)).join('');
            slides.push(`<div class="slide">${slideHTML}</div>`);
        }

        teamSlider.html(slides.join(''));

        // Initialize slick slider
        teamSlider.slick({
            dots: true,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
        });

        // Handle navigation buttons
        $('.prev-btn').click(() => {
            teamSlider.slick('slickPrev');
        });

        $('.next-btn').click(() => {
            teamSlider.slick('slickNext');
        });
    }

    // Start the initialization
    initializeSlider();
});