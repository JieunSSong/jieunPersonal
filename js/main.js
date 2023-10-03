// 헤더
document.addEventListener("scroll", function() {

  // 변수 지정
  let header = document.querySelector('.header'),
      about = document.querySelector('.about');
  
  // about 섹션의 위치를 가져옴
  let aboutPosition = about.getBoundingClientRect().top;

  // about 섹션이 화면 안에 들어왔을 때 폰트색상을 변경
  if (aboutPosition <= 0) {
      header.classList.add('black');
  } else {
      header.classList.remove('black');
  }

});

// nav
const links = document.querySelectorAll('nav ul li a');
links.forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    // # 제거
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    targetElement.scrollIntoView({behavior:'smooth'});
  });
});

// 스크롤 이벤트 추가
window.addEventListener('scroll', function(){
  const scrollY = this.window.scrollY;

  // 각 섹션 요소에 대한 정보 처리
  links.forEach(link => {
    const targetId = link.getAttribute('href').substring(1),
          targetElement = document.getElementById(targetId);

    // 섹션이 화면에 보이면 점 추가
    if ( 
      targetElement.offsetTop <= scrollY && 
      targetElement.offsetTop + targetElement.offsetHeight > scrollY
      ) {
        link.classList.add('on');
      } else {
        link.classList.remove('on');
      }
  });
});

// 반응형 햄버거 메뉴
let hamburgerBtn = document.querySelector('.trigger'),
    mobileNav = document.querySelector('.m_nav'),
    closeBtn = document.querySelector('.closeBtn'),
    navList = document.querySelectorAll('.m_nav nav ul li a');

hamburgerBtn.addEventListener('click', function() {
  mobileNav.classList.add('on');
});

closeBtn.addEventListener('click', function() {
  mobileNav.classList.remove('on');
});

navList.forEach(function(navItem) {
  navItem.addEventListener('click', function() {
    mobileNav.classList.remove('on');
  });
});




// 눈 내리는 애니메이션
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let width, height, lastNow
let snowflakes
const maxSnowflakes = 100

function init() {
  snowflakes = []
  resize()
  render(lastNow = performance.now())
}

function render(now) {
  requestAnimationFrame(render)
  
  const elapsed = now - lastNow
  lastNow = now
  
  ctx.clearRect(0, 0, width, height)
  if (snowflakes.length < maxSnowflakes)
    snowflakes.push(new Snowflake())
  
  ctx.fillStyle = ctx.strokeStyle = '#fff'

  snowflakes.forEach(snowflake => snowflake.update(elapsed, now))
}

function pause() {
  cancelAnimationFrame(render)
}
function resume() {
  lastNow = performance.now()
  requestAnimationFrame(render)
}

class Snowflake {
  constructor() {
    this.spawn()
  }
  
  spawn(anyY = false) {
    this.x = rand(0, width)
    this.y = anyY === true
      ? rand(-50, height + 50)
      : rand(-50, -10)
    this.xVel = rand(-.05, .05)
    this.yVel = rand(.02, .1)
    this.angle = rand(0, Math.PI * 2)
    this.angleVel = rand(-.001, .001)
    this.size = rand(7, 12)
    this.sizeOsc = rand(.01, .5)
  }
  
  update(elapsed, now) {
    const xForce = rand(-.001, .001);

    if (Math.abs(this.xVel + xForce) < .075) {
      this.xVel += xForce
    }
    
    this.x += this.xVel * elapsed
    this.y += this.yVel * elapsed
    this.angle += this.xVel * 0.05 * elapsed //this.angleVel * elapsed
    
    if (
      this.y - this.size > height ||
      this.x + this.size < 0 ||
      this.x - this.size > width
    ) {
      this.spawn()
    }
    
    this.render()
  }
  
  render() {
    ctx.save()
    const { x, y, angle, size } = this
    ctx.beginPath()
    ctx.arc(x, y, size * 0.2, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.restore()
  }
}

// Utils
const rand = (min, max) => min + Math.random() * (max - min)
const media = {
  desktop: 1920,
  tablet: 1023,
  mobile: 768
}
let currentType = media['desktop'];
function resize() {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  console.log('currentType: ',currentType)
  console.log('width : ',width)
  if (!(width < media.desktop)) {
    currentType = media.desktop;
  } else {
    if (!(width < media.tablet)) {
      currentType = media.tablet;
    } else {
      currentType = media.mobile;
    }
  }
  splitWords();
}

window.addEventListener('resize', resize)
window.addEventListener('blur', pause)
window.addEventListener('focus', resume)
init()

window.addEventListener('DOMcontentloaded', () => {
  if(window.innerWidth <= media['tablet']) {
    currentType = media['tablet'];
  }
});


// 시작 문구 blur 효과
function splitWords() {
  let h1 = document.querySelector(".main_text h1");
  h1.innerText.replace(/(<([^>]+)>)/ig,"");
  h1_words = h1.innerText.split(" "),
  h1_count = h1_words.length;
  h1.innerHTML = "";
  for ( let i = 0 ; i < h1_count ; i++ ) {
    h1.innerHTML += "<span>" + h1_words[i] + "</span>";
    if ( i < h1_words.length - 1) {
      h1.innerHTML += " ";
    }
    // i 값이 2번째일때 <br> 태그 추가
    if ( i === 1 && currentType <= media.tablet) {
      h1.innerHTML += "<br>";
    }
  }
  h1_words = document.querySelectorAll(".main_text h1 span");
  fadeWords(h1_words);
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function fadeWords(words) {
  Array.prototype.forEach.call(words, function(word) {
    let animate = word.animate([{
      opacity: 0,
      filter: "blur("+getRandom(2,5)+"px)"
    }, {
      opacity: 1,
      filter: "blur(0px)"
    }], 
    { 
      duration: 1000,
      delay: getRandom(500,3300),
      fill: 'forwards'
    } 
   )
  })
}

splitWords();

// skill
// 스크롤 이벤트를 감지하여 progress_bar를 채우는 함수
function fillProgressBar() {
  const progressBars = document.querySelectorAll('.progress_bar');
  const skillSection = document.getElementById('tab_skill');

  progressBars.forEach(progressBar => {
    let startNum = 0;
    const endNum = parseInt(progressBar.getAttribute('data-bar'));
    const rect = skillSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom >= 0 && progressBar.getAttribute('data-filled') !== 'true') {
      // 스킬 섹션 범위 내에 있고, 아직 채우지 않았다면 채우기 시작
      progressBar.setAttribute('data-filled', 'true'); // 한 번 채웠음을 표시

      let numAni = setInterval(function () {
        if (startNum >= endNum) {
          clearInterval(numAni);
          return;
        }
        progressBar.style.width = startNum + '%';
        startNum++;
      }, 20); // 10밀리초(0.01초)마다 width를 증가시킴
    }
  });
}

// 스크롤 이벤트에 fillProgressBar 함수를 연결
window.addEventListener('scroll', fillProgressBar);

// project
// 슬라이드 네비게이션 클릭 이벤트
function slideNavClick(e) {
  e.preventDefault();

  // 현재 활성 슬라이드
  let activeSlide = document.querySelector('.slide_container.active').getAttribute('data-slide'),
      nextSlide = this.getAttribute('data-slide');

  // active 클래스 제거
  let slideNavs = document.querySelectorAll('.slide_nav');
  slideNavs.forEach(function(nav) {
    nav.classList.remove('active');
  });

  // active 클래스 추가
  this.classList.add('active');

  if (activeSlide === nextSlide) {
    return false;
  } else {
    // 다음 슬라이드 찾아서 prestart 클래스 추가
    let nextSlideContainer = document.querySelector('.slide_container[data-slide="' + nextSlide + '"]');
    nextSlideContainer.classList.add('preStart');

    // 현재 활성 슬라이드에 aniEnd 클래스 추가
    let activeSlideContainer = document.querySelector('.slide_container.active');
    activeSlideContainer.classList.add('aniEnd');

    // 애니메이션 클래스 추가 및 제거 지연
    setTimeout(function() {
      // nextSlideContainer.classList.remove('aniStart', 'preStart');
      // activeSlideContainer.classList.remove('aniEnd', 'active');
      // nextSlideContainer.classList.add('active');
      // activeSlideContainer.classList.add('aniStart');


      // currentSlide.classList.remove('animate--start', 'flex--preStart');
      // currentSlide.classList.add('flex--active');
      // currentSlide.classList.remove('animate--end');

      // nextSlide.classList.remove('animate--start', 'flex--preStart');
      // nextSlide.classList.add('flex--active');

      // currentSlide.classList.add('animate--start');
      // currentSlide.classList.remove('animate--end', 'flex--active');


      // activeSlideContainer.classList.remove('aniStart', 'preStart');
      // activeSlideContainer.classList.add('active');
      // activeSlideContainer.classList.remove('aniEnd');
      
      nextSlideContainer.classList.remove('aniStart', 'preStart');
      nextSlideContainer.classList.add('active');

      activeSlideContainer.classList.remove('aniEnd', 'active');
      activeSlideContainer.classList.add('aniStart');


    }, 800);
  }
}
// 모든 슬라이드 네비에 클릭 이벤트 추가
let slideNavs = document.querySelectorAll('.slide_nav');
slideNavs.forEach(function(nav) {
  nav.addEventListener('click', slideNavClick);
});