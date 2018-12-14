var config = {
  apiKey: "AIzaSyDt2YokhP5V6eMenWm6mWPWI5lXvCdEtDU",
  authDomain: "traintimes-59083.firebaseapp.com",
  databaseURL: "https://traintimes-59083.firebaseio.com",
  projectId: "traintimes-59083",
  storageBucket: "traintimes-59083.appspot.com",
  messagingSenderId: "51613335242"
};
firebase.initializeApp(config);

var database = firebase.database();

var train = "";
var destintion = "";
var fTrain = "";
var frequency = "";

$("#submitBtn").on("click", function() {
  //variable that holds current time

  //Creating the object that will be the train

  train = $("#name").val();
  destination = $("#destination").val();
  fTrain = $("#firstTrain").val();
  firstTrainConverted = moment(fTrain, "HH:mm");
  frequency = $("#frequency").val();

  console.log(firstTrainConverted);
  // Do I need this as an object?
  //   var travel = {
  //     TrainName: train,
  //     Destination: destination,
  //     FirstTrain: fTrain,
  //     Frenquency: frequency
  //   };

  database.ref().push({
    TrainName: train,
    Destination: destination,
    FirstTrain: fTrain,
    Frenquency: frequency
  });
});

database.ref().on("child_added", function(snapshot) {
  var picWeTook = snapshot.val();
  trainTimeConverted = moment(picWeTook.FirstTrain, "HH:mm").subtract(
    1,
    "year"
  );
  console.log(trainTimeConverted);

  var diffTime = moment().diff(moment(trainTimeConverted), "minutes");

  console.log(diffTime);

  var tRemainder = diffTime % picWeTook.Frenquency;

  console.log(tRemainder);

  var minutesTillTrain = picWeTook.Frenquency - tRemainder;

  console.log(minutesTillTrain);

  var nextTrainTime = moment().add(minutesTillTrain, "minutes");
  console.log(moment(nextTrainTime).format("HH:mm"));

  var newRow = $("<tr>").append(
    "<td>" +
      picWeTook.TrainName +
      "</td>" +
      "<td>" +
      picWeTook.Destination +
      "</td>" +
      "<td>" +
      picWeTook.Frenquency +
      "</td>" +
      "<td>" +
      moment(nextTrainTime).format("HH:mm") +
      "</td>" +
      "<td>" +
      minutesTillTrain +
      "</td>"
  );

  $("#tableDisplay >tbody").append(newRow);
});
