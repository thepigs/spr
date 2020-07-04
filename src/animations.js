import gsap from 'gsap'

export function bounce(target,options){
    console.log(target)
    var tl = gsap.timeline(options);
    for (let i = 0; i < 3;i++) {
        tl.to(target, {y: -10, duration: 0.2})
            .to(target, {y: 100, duration: 0.5})
            .to(target, {y: -0, duration: 0.5})
            .call(options.onRepeat,[i])
    }
    tl.to(target, {y: 100, duration: 0.5})
}

export function fade(target,options){
    let tl = gsap.timeline(options);
    tl.to(target, { opacity: 0, duration: 0.5})
    return tl
}

export function expandRotate(target){
    let tl = gsap.timeline();
    tl.fromTo(target, { scale:0, opacity:0.2},{ scale:1, opacity:1, duration: 1})
    let tl2 = gsap.timeline({repeat:10,yoyo:true})
    let dur = 0.5
   tl2.fromTo(target, { rotateZ:'-10deg'}, { rotateZ:'10deg', duration:dur});
    return tl
}

export function rotate(target){
    let tl2 = gsap.timeline({repeat:10,yoyo:true})
    let dur = 0.5
    tl2.fromTo(target, { rotateZ:'-10deg'}, { rotateZ:'10deg', duration:dur});
    return tl2
}
