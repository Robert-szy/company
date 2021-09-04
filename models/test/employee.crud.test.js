const Employee = require('../employee.model');
// const Department = require('../department.model.js');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });

    } catch(err) {
      console.log(err);
    }
  });

  describe('Reading data', () => {

    before(async () => {
      const empOne = new Employee({ firstName: 'fName1', lastName: 'lName1', department: 'dep1' });
      await empOne.save();
    
      const empTwo = new Employee({ firstName: 'fName2', lastName: 'lName2', department: 'dep2' });
      await empTwo.save();
      
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: 'fName1' });
      const expectedName = 'fName1';
      expect(employee.firstName).to.be.equal(expectedName);

      const department = await Employee.findOne({ department: 'dep2' });
      const expectedDep = 'dep2';
      expect(department.department).to.be.equal(expectedDep);
      
    });
  
    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Creating data', () => {
    it('should insert new document', async () => {
      const employee = new Employee({ firstName: 'fName1', lastName: 'lName1', department: 'dep1' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const empOne = new Employee({ firstName: 'fName1', lastName: 'lName1', department: 'dep1' });
      await empOne.save();
    
      const empTwo = new Employee({ firstName: 'fName2', lastName: 'lName2', department: 'dep2' });
      await empTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'fName1' }, { $set: { firstName: '=fName1=' }});
      const updatedEmployee = await Employee.findOne({ firstName: '=fName1=' });
      expect(updatedEmployee).to.not.be.null;
    });
  
    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'fName1' });
      employee.firstName = '=fName1=';
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: '=fName1=' });
      expect(updatedEmployee).to.not.be.null;
    });
  
    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
      const employees = await Employee.find({ firstName: 'Updated!' });
      expect(employees.length).to.be.equal(2);
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const empOne = new Employee({ firstName: 'fName1', lastName: 'lName1', department: 'dep1' });
      await empOne.save();
    
      const empTwo = new Employee({ firstName: 'fName2', lastName: 'lName2', department: 'dep2' });
      await empTwo.save();
    });
    
    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'fName1' });
      const removeEmployee = await Employee.findOne({ firstName: 'fName1' });
      expect(removeEmployee).to.be.null;
  
    });
  
    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'fName1' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ firstName: 'fName1' });
      expect(removedEmployee).to.be.null;
    });
  
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });
  
  });

  // describe('Find populate', () => {
  //   before(async () => {

  //     // const testDep = new Department({ name: 'depart1' });
  //     // await testDep.save();
  //     const testEmpl1 = new Employee({ firstName: 'fName1', lastName: 'lName1', department: 'dep1' });
  //     await testEmpl1.save();
  //     const testEmpl2 = new Employee({ firstName: 'fName2', lastName: 'lName2', department: 'dep1' });
  //     await testEmpl2.save();
  //     const testEmpl3 = new Employee({ firstName: 'fName3', lastName: 'lName3', department: 'dep2' });
  //     await testEmpl3.save();
  //   });

    
  //   it('should return all the data with "find.populate" method', async () => {
  //     const employees = await Employee.findOne( { firstName:'fName1' }).populate('department');

  //     const expectedDep = 'dep1';
  //     expect(employees.department.name).to.be.equal(expectedDep);
       
  //   });

  //   after(async () => {
  //     await Employee.deleteMany();
  //     // await Department.deleteMany();
  //   });
  
  // });
  
});