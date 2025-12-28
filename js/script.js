
window.addEventListener('load', () => {
  document.getElementById('preloader').style.display = 'none';
});


const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));

const track = document.getElementById('galleryTrack');
const slides = track.children;
let index = 0;

function updateGallery() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

document.getElementById('next').onclick = () => {
  index = (index + 1) % slides.length;
  updateGallery();
};

document.getElementById('prev').onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  updateGallery();
};

setInterval(() => {
  index = (index + 1) % slides.length;
  updateGallery();
}, 5000);


const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navlinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active'); 
  navLinks.classList.toggle('active');  
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });

});


const gallerySection = document.getElementById("gallery");
const audio = document.getElementById("bgMusic");

let isPlaying = false;
let inactivityTimer;

function fadeInAudio() {
  if (isPlaying) return;

  audio.volume = 0;
  audio.play().then(() => {
    isPlaying = true;
    let v = 0;
    const fade = setInterval(() => {
      v += 0.02;
      audio.volume = Math.min(v, 0.6);
      if (v >= 0.6) clearInterval(fade);
    }, 60);
  }).catch(() => {});
}

function fadeOutAudio() {
  if (!isPlaying) return;

  let v = audio.volume;
  const fade = setInterval(() => {
    v -= 0.04;
    audio.volume = Math.max(v, 0);
    if (v <= 0) {
      audio.pause();
      audio.currentTime = 0;
      isPlaying = false;
      clearInterval(fade);
    }
  }, 80);
}

function resetInactivity() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    fadeOutAudio();
  }, 5000);
}


["mousemove", "click", "scroll", "touchstart"].forEach(evt => {
  gallerySection.addEventListener(evt, () => {
    fadeInAudio();
    resetInactivity();
  });
});



const galleryTrack = document.getElementById("galleryTrack");

let scrollSpeed = 1; 
let interval = 80;  

setInterval(() => {
  galleryTrack.scrollLeft += scrollSpeed;

  if (
    galleryTrack.scrollLeft + galleryTrack.clientWidth >=
    galleryTrack.scrollWidth
  ) {
    galleryTrack.scrollLeft = 0;
  }
}, interval);



function fadeOutAudio() {
  if (!isPlaying) return;

  let v = audio.volume;
  const fade = setInterval(() => {
    v -= 0.04;
    audio.volume = Math.max(v, 0);
    if (v <= 0) {
      audio.pause();
      audio.currentTime = 0;
      isPlaying = false;
      clearInterval(fade);
    }
  }, 80);
}


function resetInactivity() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    fadeOutAudio();
  }, 5000); 
}


const galleryObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fadeInAudio();
      resetInactivity();
    } else {
      fadeOutAudio();
    }
  });
}, { threshold: 0.5 });

galleryObserver.observe(gallery);


["mousemove", "click", "scroll", "touchstart"].forEach(evt => {
  gallery.addEventListener(evt, () => {
    fadeInAudio();
    resetInactivity();
  });
});




