
//Slideshow
var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block";
  setTimeout(carousel, 2000); // Change image every 2 seconds
}




//Game JS

(function(){
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
     {
    question: "The average woman earns _% of what the average man makes.",
    answers: {
      a: "82%",
      b: "90%",
      c: "62%"
    },
    correctAnswer: "a"
  },
  {
    question: "When was the Equal Pay Act federal law passed?",
    answers: {
      a: "1987",
      b: "1959",
      c: "1963"
    },
    correctAnswer: "c"
  },
  {
    question: "What is the percentage ratio of men to women who have experienced discrimination in work, due to gender? (men%: women%)",
    answers: {
      a: "30:60",
      b: "22:20",
      c: "19:50",
    },
    correctAnswer: "c"
  },
  {
    question: "How many women in STEM and Non-STEM jobs have experienced sexual harassment in the workplace?",
    answers: {
      a: "1/5",
      b: "1/10",
      c: "1/3",
    },
    correctAnswer: "a"
  }
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();

var factsBtn = $('.facts');
var message = $('.message');
factsBtn.on("click", displayFunFacts);

function displayFunFacts(){
  message.css("font-size", "12px");
  message.text("For question one, the average asian woman makes 90%, while the average black woman makes 62%. For question 2, even though the Equal Pay Act exists, it has not yet eliminated the gender and race wage gap.  For question 4, it is important to note that 7% of men in STEM have experienced sexual harrassment as well (in a study by Pew Research Center).");
};

var cardContainer = $('.card-container');
var comments = $('.submit-btn');

comments.on("click", appendSomeoneAwesome);

function appendSomeoneAwesome(event) {
  event.preventDefault();
  var name = $('.name').val();

  cardContainer.append(`
    <p class="name-card">${name}</p>
  `);
}