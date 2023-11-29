"use-strict";

const Toast = Swal.mixin({
    toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

document.getElementById('bug-report').addEventListener('vl-bug-report', (e)=>{
    if(e.detail.status === 200 || e.detail.status === 201){
        const learningUnit = document.head.querySelector('meta[name="learning-unit"]').content;
        const task = document.head.querySelector('meta[name="task-name"]').content;
        dataLayer.push({
            event: "vl-bug-report",
            "bug-type": e.detail.issues,
            "learning-unit": learningUnit ? learningUnit : "", 
            "task-name": task ? task : ""
        })        
        Toast.fire({
          icon: 'success',
          iconColor: "white",
          background:"#a5dc86",
          title: 'Bug Reported Successfully',
        })
    }else{
        Toast.fire({
            icon: 'error',
            iconColor: "white", 
            color:"white",
            background:"#f27474",
            timer: 5000,
            title: 'Bug Report Failed, Please Try Again',
        })
    }
})
