const grades = {
    Junior: 'junior',
    Middle: 'middle',
    Senior: 'senior',
};

const bonuses = {
    'C++': 100,
    Rust: 150,
    default: 50,
};

const gradeTax = {
    [grades.Junior]: 0.25,
    [grades.Middle]: 0.5,
    [grades.Senior]: 0.75,

};

const violation = {
    sluggish: 'sluggish',
    frequentMistakes: 'frequentMistakes',
    absenteeism: 'absenteeism',
    default: 0,
};

const violationTax = {
    [violation.sluggish]: 0.2,
    [violation.frequentMistakes]: 0.35,
    [violation.absenteeism]: 0.5,
    [violation.default]: 0,
};

function User(name, language, grade = grades.Junior, violation = violationTax.default) {
    this.name = name;
    this.grade = grade;
    this.salary = 1000;
    this.language = language;
    this.tasks = 0;
    this.violation = violation;
    this.completedTasks = 0;

    this.addTask = () => {
        this.tasks++;
    };

    this.finishTaskAndSalary = () => {
        if (this.tasks > 0) {
            this.tasks--;
            this.completedTasks++;
            this.salary += (bonuses[this.language] || bonuses.default) * gradeTax[this.grade];
        }
    };

    this.upgrade = () => {
        if (this.completedTasks >= 4) {
            if (this.grade === 'junior') {
                this.grade = grades.Middle;
            }
            else if (this.grade === 'middle') {
                this.grade = grades.Senior;
            }
        } else {
            console.log('You have not completed several tasks for the next level !!!');
        };    
    };

    this.fine = () => {
        this.salary = this.salary - (this.salary * violationTax[violation]); 
    }
}

const user = new User('John', 'C++', grades.Junior, violation.absenteeism);
const user1 = new User('Vasya', 'Rust', grades.Senior, violation.frequentMistakes);
const user2 = new User('Nifertiti', 'Bu', grades.Middle);

user.addTask();
user.addTask();
user.addTask();
user.addTask();
user.addTask();

user1.addTask();
user1.addTask();
user1.addTask();

user.finishTaskAndSalary();
user.finishTaskAndSalary();
user.finishTaskAndSalary();
user.finishTaskAndSalary();

user1.finishTaskAndSalary();
user1.finishTaskAndSalary();

user.upgrade();

user.fine();

user1.upgrade();

user1.fine();

console.log(user);
console.log(user1);