require(['main'], function(ReportsGenerator) {

  // Basic sheet test
  /*
  var xls = xlwrapper.createWorkbook("test2.xlsx");
  var sheet1 = xls.createSheet("My Sheet", 10, 10);
  var sheet2 = xls.createSheet("My Other Sheet", 20, 10);

  sheet1.set(1, 3, "This is string");
  sheet1.set(2, 3, 5);
  sheet1.set(3, 3, new Date());
  sheet1.set(4, 3, true);

  // Styles does not work
  sheet1.makeTrippy(1, 3);
  */
 
 /* Reports generation test */
var Table1 = new ReportsGenerator.Table("Table1", [String, Number, Number], ["Name", "number of hits", "number of misses"]);
var Table2 = new ReportsGenerator.Table("Table2", [String, String, String], ["FirstName", "Email", "PhoneNumber"]);
var Table3 = new ReportsGenerator.Table("Table3", [String, Date, Boolean, Boolean], ["Name", "Birthdate", "Married", "CollegeEducated"]);
var Table4 = new ReportsGenerator.Table("Table4", [Date, Number], ["Day", "Number of Sales"]);
var Table5 = new ReportsGenerator.Table("Table5", [Number, Number], ["EmployeeId", "Number of signins"]);
var Table6 = new ReportsGenerator.Table("Table6", [String, Number], ["Name", "age"]);

// Erroneous code
// var ErrSchematype = new xls.Table("TableError1", ["string", "widget"], ["asdfasd", "asdfasdf"]);
// var ErrLabelLen = new xls.Table("TableError2", ["string", "date", "boolean"], ["asdfasdf", "asdfasf"]);

// Show me the tables
console.log(Table1);
console.log(Table2);
console.log(Table3);
console.log(Table4);
console.log(Table5);
console.log(Table6);

// Now let us try pushing rows
Table1.pushRow(["John Smith", 1, 2]);
Table1.pushRow(["John Smith", 3, 4]);
Table2.pushRow(["John", "John@j.com", "555-555-5555"]);
Table3.pushRow(["Mike", new Date(), true, true]);

// Errorneous pushes
// Table1.pushRow(["Oh you", "JK", "Bro"]);
// Table3.pushRow(["Mike", new Date(), 1, 1]);

// After pushing a row
console.log();
console.log("After pushing");
console.log(Table1);
console.log(Table2);
console.log(Table3);

// Populate the tables
(function() {
  // Helper random generation functions
  var getBool = function() {
    var val = (Math.random() < .5) ? true : false;
    return val;
  };

  var getNameString = function() {
    var first = ["John", "Jane", "Bob", "Dylan", "Fred", "Mike", "Susie", "Cindy", "Alice"];
    var last = ["Smith", "Doe", "Li", "Wang", "Zhang", "Chen", "Wei", "Dylan", "Johnson"];
    var genName = first[Math.floor(Math.random() * first.length)] + " " 
        + last[Math.floor(Math.random() * last.length)];
    return genName;
  };

  var getPhoneString = function() {
    var string = "";

    var num = Math.floor(Math.random() * 1000);
    string += num + "-";

    var num = Math.floor(Math.random() * 1000);
    string += num + "-";

    var num = Math.floor(Math.random() * 10000);
    string += num;

    return string;
  }

  var getDate = function() {
    return new Date();
  };

  var getNumber = function() {
    return Math.floor(Math.random() * 100) + 1;
  };


  // Population logic
  var numEntries = getNumber();
  for (var i = 0; i < numEntries; i++) {
    Table1.pushRow([getNameString(), getNumber(), getNumber()]);
  };

  numEntries = getNumber(); // get a random number of entries
  for (var i = 0; i < numEntries; i++) {
    Table2.pushRow([getNameString(), "email@email.com", getPhoneString()]);
  }

  numEntries = getNumber();
  for (var i = 0; i < numEntries; i++) {
    Table3.pushRow([getNameString(), getDate(), getBool(), getBool()])
  }

  numEntries = getNumber();
  for (var i = 0; i < numEntries; i++) {
    Table4.pushRow([getDate(), getNumber()]);
  }

  numEntries = getNumber();
  for (var i = 0; i < numEntries; i++) {
    Table5.pushRow([getNumber(), getNumber()]);
  }

  numEntries = getNumber();
  for (var i = 0; i < numEntries; i++) {
    Table6.pushRow([getNameString(), getNumber()]);
  }

  })();

  console.log(Table1);
  console.log(Table2);
  console.log(Table3);
  console.log(Table4);
  console.log(Table5);
  console.log(Table6);

  // Object to render
  var excelObject = {
    sheet1: {
      name: "Sheet 1", 
      information: {
        generated: new Date(),
        author: "Mike Zhang"
      },
      data: [Table1, Table2, Table3]
    },
    sheet2: {
      name: "Sheet 2",
      data: [Table4, Table5, Table6]
    }
  }


  ReportsGenerator.ExcelReport(excelObject, function(err, obj) {
    if (err) console.log("Big Trubble: " + err);
    obj.save("myfile");
  });
  
});


