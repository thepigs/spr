import gsap from 'gsap'

export function bounce(target,onRepeat){
    console.log(target)
    var tl = gsap.timeline({repeat: 2, onRepeat});
    tl.to(target, { y: -10, duration: 0.2})
        .to(target, { y: 100, duration: 0.5})
        .to(target, { y: -0, duration: 0.5})
}