'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {

    prompting() {

        this.log(
            yosay(`Welcome to the super-excellent ${chalk.red('generator-vlcj')} generator!`)
        );

        const prompts = [
            {
                type: 'input',
                name: 'groupId',
                message: 'What is the project Maven groupId?',
                default: 'com.mycompany'
            },
            {
                type: 'input',
                name: 'name',
                message: 'What is the project name?',
                default: this.appname.replace(/\s/g, '-')
            },
            {
                type: 'input',
                name: 'description',
                message: 'Describe the project:'
            },
            {
                type: 'input',
                name: 'packageName',
                message: 'What is the top-level package name for your project?',
                default: function(answers) {
                    return answers.groupId + '.' + answers.name.replace(/\-/g, '');
                }
            },
            {
                type: 'input',
                name: 'mainClassName',
                message: 'What is the name for the main class?',
                default: 'Application'
            },
            {
                type: 'confirm',
                name: 'useComponent',
                message: 'Use vlcj\'s component framework?',
                default: true
            },
            {
                type: 'input',
                name: 'vlcjVersion',
                message: 'Which version of vlcj is required?',
                default: '4.0.6'
            },
            {
                type: 'input',
                name: 'sourceJdk',
                message: 'Which JDK level to use for compiling sources?',
                default: '1.8'
            },
            {
                type: 'input',
                name: 'targetJdk',
                message: 'Which JDK level to use for the compiled class files?',
                default: function(answers) {
                    return answers.sourceJdk;
                }
            },
            {
                type: 'confirm',
                name: 'gitIgnore',
                message: 'Add .gitignore?',
                default: true
            },
            {
                type: 'confirm',
                name: 'gitKeep',
                message: 'Add .gitkeep to empty directories?',
                default: true
            }
        ];

        return this.prompt(prompts).then(props => {
            // To access props later use this.props.someAnswer;
            this.props = props;
        });
    }

    writing() {
        mkdirp.sync(this.destinationPath('src/main/java'));
        mkdirp.sync(this.destinationPath('src/main/resources'));
        mkdirp.sync(this.destinationPath('src/test/java'));
        mkdirp.sync(this.destinationPath('src/test/resources'));
        this.fs.copyTpl(
            this.templatePath((this.props.useComponent ? 'with-component' : 'without-component') + '/MainClass.java.tpl'),
            this.destinationPath('src/main/java/' + this.props.packageName.replace(/\./g, '/') + '/' + this.props.mainClassName + '.java'), {
                packageName  : this.props.packageName,
                mainClassName: this.props.mainClassName,
                name         : this.props.name
            }
        );
        this.fs.copyTpl(
            this.templatePath('pom.xml'),
            this.destinationPath('pom.xml'), {
                name         : this.props.name,
                description  : this.props.description,
                groupId      : this.props.groupId,
                vlcjVersion  : this.props.vlcjVersion,
                sourceJdk    : this.props.sourceJdk,
                targetJdk    : this.props.targetJdk
            }
        );
        if (this.props.gitIgnore) {
            this.fs.copy(
                this.templatePath('gitignore'),
                this.destinationPath('.gitignore')
            );
        }
        if (this.props.gitKeep) {
            this.fs.copy(
                this.templatePath('gitkeep'),
                this.destinationPath('src/main/resources/.gitkeep')
            );
            this.fs.copy(
                this.templatePath('gitkeep'),
                this.destinationPath('src/test/java/.gitkeep')
            );
            this.fs.copy(
                this.templatePath('gitkeep'),
                this.destinationPath('src/test/resources/.gitkeep')
            );
        }
    }

    install() {
    }

  };
