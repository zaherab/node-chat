var expect = require('expect');

var { Users } = require('../utils/users');


describe('Users', ()=>{
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id:'1',
            name:'Zaher',
            room:'Zaher Room'
        },
        {
            id:'2',
            name:'Bahaa',
            room:'Bahaa Room'
        },
        {
            id:'3',
            name:'Hisham',
            room:'Zaher Room'
        }]
    });
    it('should add new user',()=>{
        var users = new Users();
        var user = {
            id:'123',
            name: 'Zaher',
            room: 'Zaher Room'
        };
        var resUser= users.addUser(user.id,user.name, user.room);
        expect(users.users).toEqual([user]);
    });

     it('should remove a user',()=>{
        var userId = '1';

        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
     });

     it('should not remove a user',()=>{
         var userId = '25';

        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
     });

     it('should find user',()=>{
         var userId = '2';
         var user = users.getUser(userId);
         expect(user.id).toBe(userId);
     });

     it('should not find user',()=>{
         var userId = '25';
         var user = users.getUser(userId);
         expect(user).toNotExist();
     });

    it('should return name for zaher room',()=>{
        var userList = users.getUserList('Zaher Room');
        expect(userList).toEqual(['Zaher','Hisham']);
    });

    it('should return name for bahaa room',()=>{
        var userList = users.getUserList('Bahaa Room');
        expect(userList).toEqual(['Bahaa']);
    });
})