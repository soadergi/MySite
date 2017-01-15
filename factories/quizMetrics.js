(function(){
	angular.module('turtleFacts').factory('quizMetrics', ["DataService", QuizMetrics]);

	function QuizMetrics (DataService){
		var quizObj={
			quizActive: false,
			resultsActive: false,
			correctAnswers: [],
			numCorrect:0,
			changeState (metric, state){
				if(metric == 'quiz'){
					this.quizActive = state;
				}else if(metric == 'results'){
					this.resultsActive = state; 
				}else{
					return false
				}
			},

			markQuiz(){
				this.correctAnswers = DataService.correctAnswers;
				for(let i=0; i<DataService.quizQuestions.length; i++){
					if(DataService.quizQuestions[i].selected == DataService.correctAnswers[i]){
						DataService.quizQuestions[i].correct = true;
						quizObj.numCorrect++;
					}else{
						DataService.quizQuestions[i].correct = false;
					}
				}
			}
		};



		return quizObj;
	}
})();