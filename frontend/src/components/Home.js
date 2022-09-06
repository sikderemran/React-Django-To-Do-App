import React, { Component } from 'react';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            activeItem: {
                id: null,
                title: '',
                completed: false
            },
            editing: false
        }
        this.fetchTaskList = this.fetchTaskList.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getCookie = this.getCookie.bind(this)
        this.startEdit = this.startEdit.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.strikeUnstrike = this.strikeUnstrike.bind(this)
    }
    componentWillMount() {
        this.fetchTaskList()
    }
    fetchTaskList() {
        fetch('http://localhost:8000/api/task-list')
            .then(response => response.json())
            .then(data =>
                this.setState({
                    todoList: data
                })
            )
    }
    handleChange(e) {
        var name = e.target.name
        var value = e.target.value
        this.setState({
            activeItem: {
                ...this.state.activeItem,
                title: value
            }
        })
    }

    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    handleSubmit(e) {
        e.preventDefault()
        var csrftoken = this.getCookie('csrftoken')
        var url = 'http://localhost:8000/api/task-create'

        if (this.state.editing == true) {
            url = `http://localhost:8000/api/task-update/${this.state.activeItem.id}/`
            this.setState({
                editing: false
            })
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(this.state.activeItem)
        }).then((response) => {
            this.fetchTaskList()
            this.setState({
                activeItem: {
                    id: null,
                    title: '',
                    completed: false,
                }
            })
        }).catch(function (error) {
            console.log('ERROR:', error)
        })
    }

    startEdit(task) {
        console.log(task)
        this.setState({
            activeItem: task,
            editing: true,
        })
    }

    deleteTask(task) {
        var csrftoken = this.getCookie('csrftoken')

        fetch(`http://localhost:8000/api/task-delete/${task.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
        }).then((response) => {

            this.fetchTaskList()
        })
    }


    strikeUnstrike(task){

        task.completed = !task.completed
        var csrftoken = this.getCookie('csrftoken')
        var url = `http://localhost:8000/api/task-update/${task.id}/`
    
          fetch(url, {
            method:'POST',
            headers:{
              'Content-type':'application/json',
              'X-CSRFToken':csrftoken,
            },
            body:JSON.stringify({'completed': task.completed, 'title':task.title})
          }).then(() => {
            this.fetchTaskList()
          })
    
      }


    render() {
        var tasks = this.state.todoList
        var self = this
        return (
            <div style={{
                margin: "20vh auto",
                textAlign: "center"
            }}>
                <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                    <form onSubmit={this.handleSubmit} >
                        <input onChange={this.handleChange} type={"text"} name={"name"} value={this.state.activeItem.title} />
                        <button>Submit</button>
                    </form>
                </div>
                <div style={{ display: "flex", width: "100%", justifyContent: "center", marginTop: "30px" }}>
                    <table style={{
                        border: "1px solid #000",
                        borderCollapse: "collapse"
                    }}>
                        <thead>
                            <tr>
                                <th style={{
                                    border: "1px solid #000",
                                }}>SL.</th>
                                <th style={{
                                    border: "1px solid #000",
                                }}>Title</th>
                                <th style={{
                                    border: "1px solid #000",
                                }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.map(function (task, index) {
                                    return (
                                        <tr onClick={() => self.strikeUnstrike(task)} key={index}>
                                            <td style={{
                                                border: "1px solid #000",
                                            }}>{task.id}
                                            </td>
                                           
                                            <td
                                                style={{
                                                    border: "1px solid #000",
                                                }}
                                            > {task.completed==true?<strike>{task.title}</strike>:task.title}
                                            </td>
                                            <td
                                                style={{
                                                    border: "1px solid #000",
                                                }}
                                            >
                                                <span style={{ cursor: "pointer" }} onClick={() => self.startEdit(task)}>Edit</span>
                                                ||
                                                <span style={{ cursor: "pointer" }} onClick={() => self.deleteTask(task)}>Delete</span>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}

