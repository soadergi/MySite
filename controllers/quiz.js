(function(){
	angular.module('turtleFacts').controller('QuizCtrl', ['quizMetrics', 'DataService', QuizController]);

	function QuizController (quizMetrics, DataService){
		this.quizMetrics = quizMetrics;
		this.dataService = DataService;
		this.activeQuestion = 0;
		this.numQuestionsAnswered = 0;
		this.error = false;
		this.finalise = false;

		this.finaliseAnswers = function(){
			this.activeQuestion = 0;
			this.numQuestionsAnswered = 0;
			this.error = false;
			this.finalise = false;
			quizMetrics.markQuiz();
			quizMetrics.changeState('quiz', false);
			quizMetrics.changeState('results', true);
		};

		this.selectAnswer = function(index){

			if (this.dataService.quizQuestions[this.activeQuestion].selected == null){
				this.numQuestionsAnswered++;
			}

			this.dataService.quizQuestions[this.activeQuestion].selected = index;
		};

		this.setActiveQuestion = function(){

			if(arguments.length){this.activeQuestion = arguments[0];return}

			var quizLength=this.dataService.quizQuestions.length;

			for(let i=0; i<quizLength; i++){
				this.activeQuestion = this.activeQuestion < quizLength-1 ? ++this.activeQuestion:0;

				if(this.activeQuestion === 0){this.error = true}

					if(this.dataService.quizQuestions[this.activeQuestion].selected ==null){
						return
					}
				}
				this.error = false;
				this.finalise = true;
			};

			this.questionAnswered = function(){
				this.setActiveQuestion()
			};
		}
	})();