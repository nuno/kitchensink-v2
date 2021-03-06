var log = require('log');

/**
 * The scoped constructor of the controller.
 **/
(function constructor(args) {

})(arguments[0] || {});

function intitializeDatabase(e) {
	var db = Ti.Database.install('/databases/kitchensink.db','kitchensink');
	var db = Ti.Database.open('kitchensink');
	var updateName = 'I was updated';
	var updateId = 4;
	
	/**
	 *	Create new table and flush contents for a fresh start.
	 **/
	db.execute('CREATE TABLE IF NOT EXISTS DATABASETEST  (ID INTEGER, NAME TEXT)');
	db.execute('DELETE FROM DATABASETEST');
	
	/**
	 *	Insert new data to the database
	 **/
	db.execute('INSERT INTO DATABASETEST (ID, NAME ) VALUES(?,?)', 1, 'Name 1');
	db.execute('INSERT INTO DATABASETEST (ID, NAME ) VALUES(?,?)', 2, 'Name 2');
	db.execute('INSERT INTO DATABASETEST (ID, NAME ) VALUES(?,?)', 3, 'Name 3');
	db.execute('INSERT INTO DATABASETEST (ID, NAME ) VALUES(?,?)', 4, 'Name 4');
	db.execute('INSERT INTO DATABASETEST (ID, NAME ) VALUES(?,?)', 5, '\u2070 \u00B9 \u00B2 \u00B3 \u2074 \u2075 \u2076 \u2077 \u2078 \u2079');

	log.args('Ti.Database', 'JUST INSERTED, rowsAffected = ' + db.rowsAffected);
	log.args('Ti.Database', 'JUST INSERTED, lastInsertRowId = ' + db.lastInsertRowId);

	/**
	 *	Update the previously inserted data.
	 **/
	db.execute('UPDATE DATABASETEST SET NAME = ? WHERE ID = ?', updateName, updateId);
	db.execute('UPDATE DATABASETEST SET NAME = "I was updated, too!" WHERE ID = 2');
	
	log.args('Ti.Database', 'UPDATED NAME TO "I was updated, too!"');
	
	/**
	 *	Delete data from the database.
	 **/
	db.execute('DELETE FROM DATABASETEST WHERE ID = ?', 1);
	
	log.args('Ti.Database', 'DELETED FROM DATABASE (WHERE ID = 1)');
	
	/**
	 *	Select (query) data from the database.
	 **/
	var rows = db.execute('SELECT * FROM DATABASETEST');
	log.args('Ti.Database', 'ROW COUNT = ' + rows.getRowCount());
	
	while (rows.isValidRow()) {
		log.args('Ti.Database', ' - ID: ' + rows.field(0) + ' NAME: ' + rows.fieldByName('name') + ' COLUMN NAME ' + rows.fieldName(0));	
		rows.next();
	}
	
	rows.close();
	db.close(); // close db when you're done to save resources

	log.args('Ti.Database', 'CLOSED DATABASE!');
}
