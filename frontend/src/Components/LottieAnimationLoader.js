import React,{useEffect,useRef} from 'react'
import lottie from 'lottie-web'

function LottieAnimation(containerRef,animationFile){
    return {
        container : containerRef,
        renderer : 'svg',
        loop : true,
        autoplay : true,
        rendererSettings : {progressiveLoad : false},
        animationData : require('../LottieAnimations/'+animationFile+'.json')
    }
}


// export default function LottieAnimationLoader(props) {
  
//     const lottieContainer = useRef(null)

//     useEffect(()=>{
//         lottie.loadAnimation(
//             {
//                 container : lottieContainer.current,
//                 renderer : 'svg',
//                 loop : true,
//                 autoplay : true,
//                 rendererSettings : {progressiveLoad : false},
//                 animationData : require('../LottieAnimations/'+props.animationFile+'.json')
//             }
//         )
//     },[props.animationFile])

//     return (
//     <div ref={lottieContainer}>
      
//     </div>
//   )
// }


export {LottieAnimation}