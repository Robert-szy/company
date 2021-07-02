const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee model', () => {

  it('should throw an error if no args', () => {
    const emp = new Employee({});

    emp.validate(err => {
      expect(err).to.exist;
    });
  });

  it('should throw an error if one arg', () => {

    const fName = 'asdf';
    const emp = new Employee({ firstname: fName});

    emp.validate(err => {
      expect(err).to.exist;
    });
  });

  it('should throw an error if two args', () => {

    const fName = 'asdf';
    const lName = 'scxvxcv'
    const emp = new Employee({ firstname: fName, lastName: lName});

    emp.validate(err => {
      expect(err).to.exist;
    });
  });

  it('should throw an error if arg is not a string', () => {

    const fName = 'asdf';
    const lName = [];
    const department = 'department'

      const emp = new Employee({ firstName: fName, lastName: lName, department: department });
  
      emp.validate(err => {
        expect(err.errors.lastName).to.exist;
      });
  
  });

  it('should not throw an error if args are correct', () => {

    const fName = 'firstName';
    const lName = 'lastName';
    const dep = 'department';

    const emp = new Employee({ firstName: fName, lastName: lName, department: dep });
  
      emp.validate(err => {
        expect(err).to.not.exist;
      });
  });

});

after(() => {
  mongoose.models = {};
});