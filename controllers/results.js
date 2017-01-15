(function(){

	angular.module('turtleFacts').controller('resultsCtrl', ['quizMetrics', 'DataService',ResultsController]);

	function ResultsController(quizMetrics, DataService){
		this.quizMetrics =quizMetrics;
		this.dataService = DataService;
		this.activeQuestion = 0;
		this.getAnswerClass = function(index){
			if(index == quizMetrics.correctAnswers[this.activeQuestion]){
				return "bg-success";
			}else if(index == this.dataService.quizQuestions[this.activeQuestion].selected){
				return "bg-danger";
			}
		};

		this.setActiveQuestion = function(index){
			this.activeQuestion = index;
		};

		this.calculatePerc = function(){
			return quizMetrics.numCorrect / DataService.quizQuestions.length * 100;
		};

		this.reset = function(){
			quizMetrics.changeState('results', false);
			quizMetrics.numCorrect = 0;

			for (var i = 0; i < DataService.quizQuestions.length; i++) {
				var data = DataService.quizQuestions[i];

				data.selected = null;
				data.correct = null;
			}
		};
	}

})();