"use-strict";

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

document.getElementById('bug-report').addEventListener('vl-bug-report', (event) => {
  //console.log('Received vl-bug-report event:', event);
  if (event.detail.status === 200 || event.detail.status === 201) {
    const learningUnit = document.head.querySelector('meta[name="learning-unit"]').content;
    const task = document.head.querySelector('meta[name="task-name"]').content;
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "vl-bug-report",
        "bug-type": event.detail.issues,
        "learning-unit": learningUnit ? learningUnit : "",
        "task-name": task ? task : ""
      })
    }
    Toast.fire({
      icon: 'success',
      iconColor: "white",
      background: "#a5dc86",
      title: 'Bug Reported Successfully',
    })
  } else {    
    const error = event.detail.error;
    console.log('Error details:', error);
    Toast.fire({
      icon: 'error',
      iconColor: "white",
      color: "white",
      background: "#f27474",
      timer: 5000,
      title: 'Bug Report Failed',
      text: 'Please try again later',  
      //text: 'Please try again later. Error: ' + error,  
    });
  }
}); 

// Function to handle the rating submit logic
function handleRatingSubmit(e) {
  const learningUnit = document.head.querySelector('meta[name="learning-unit"]').content;
  const task = document.head.querySelector('meta[name="task-name"]').content;
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "vl-rating-submit",
      "rating": e.detail.rating,
      "rating-value": e.detail.rating,
      "learning-unit": learningUnit ? learningUnit : "",
      "task-name": task ? task : ""
    });
  }
  Toast.fire({
    icon: 'success',
    iconColor: "white",
    background: "#a5dc86",
    title: 'Rating Submitted Successfully',
  });
}

const ratingSubmitElement = document.querySelector('rating-submit');
if (ratingSubmitElement) {
  // Wait for the 'vl-rating-submit' event before adding the event listener
  ratingSubmitElement.addEventListener('vl-rating-submit', handleRatingSubmit);
}

