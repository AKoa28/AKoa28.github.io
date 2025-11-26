// jQuery Document Ready
$(document).ready(function() {
    
    // Smooth scrolling for anchor links
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 70,
            },
            500,
            'linear'
        );
    });
    
    // Navbar background change on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
        
        // Back to top button visibility
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('show');
        } else {
            $('.back-to-top').removeClass('show');
        }
    });
    
    // Back to top functionality
    $('.back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
    
    // Form validation
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        let isValid = true;
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const subject = $('#subject').val().trim();
        const message = $('#message').val().trim();
        
        // Reset previous error states
        $('.form-control').removeClass('error');
        $('.error-message').remove();
        
        // Name validation
        if (name === '') {
            $('#name').addClass('error').after('<span class="error-message text-danger">Vui lòng nhập họ tên</span>');
            isValid = false;
        }
        
        // Email validation
        if (email === '') {
            $('#email').addClass('error').after('<span class="error-message text-danger">Vui lòng nhập email</span>');
            isValid = false;
        } else if (!isValidEmail(email)) {
            $('#email').addClass('error').after('<span class="error-message text-danger">Email không hợp lệ</span>');
            isValid = false;
        }
        
        // Subject validation
        if (subject === '') {
            $('#subject').addClass('error').after('<span class="error-message text-danger">Vui lòng nhập chủ đề</span>');
            isValid = false;
        }
        
        // Message validation
        if (message === '') {
            $('#message').addClass('error').after('<span class="error-message text-danger">Vui lòng nhập nội dung</span>');
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            // In a real application, you would send the form data to a server here
            alert('Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi sớm nhất.');
            $('#contactForm')[0].reset();
        }
    });
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Scroll reveal animation
    function checkScroll() {
        $('.fade-in').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    }
    
    // Initialize scroll reveal
    $('.section-padding > .container > .row > div, .section-header').addClass('fade-in');
    $(window).on('scroll', checkScroll);
    checkScroll(); // Check on page load
    
    // Portfolio lightbox (simplified version)
    $('.portfolio-link').click(function(e) {
        e.preventDefault();
        const portfolioItem = $(this).closest('.portfolio-item');
        const imgSrc = portfolioItem.find('img').attr('src');
        const title = portfolioItem.find('h4').text();
        
        // In a real implementation, you would use a lightbox library like Lightbox2 or Fancybox
        alert(`Xem chi tiết dự án: ${title}`);
    });
    
    // Active navigation link highlighting
    $(window).scroll(function() {
        const scrollPosition = $(window).scrollTop();
        
        $('section').each(function() {
            const sectionTop = $(this).offset().top - 100;
            const sectionBottom = sectionTop + $(this).outerHeight();
            const sectionId = $(this).attr('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                $('.navbar-nav .nav-link').removeClass('active');
                $('.navbar-nav .nav-link[href="#' + sectionId + '"]').addClass('active');
            }
        });
    });
    
    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();
    
    // Animate numbers (if needed in future)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.text(value);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});