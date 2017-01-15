(function(){
	angular.module('turtleFacts').controller('listCtrl', ["quizMetrics","DataService", ListController]);


	function ListController(quizMetrics, DataService){
		this.search = '';
		this.data = DataService.turtlesData;
		this.activeTurtle = {};
		this.changeActiveTurtle = changeActiveTurtle;
		this.activateQuiz = activateQuiz;
		this.quizMetrics = quizMetrics;

		function changeActiveTurtle (index) {
			this.activeTurtle = index;
		}

		function activateQuiz () {
			this.quizMetrics.changeState('quiz', true);
		}
	}

	
})();