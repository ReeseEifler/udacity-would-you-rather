import React, { Component } from 'react'
import { connect } from 'react-redux'
import Hidden from './Hidden'

class Home extends Component {
  state = {
    answeredTab: false,
  }
  
  unanswered(e) {
    e.preventDefault()
    this.setState(() => ({
      answeredTab: false
    }))
  }
  
  answered(e) {
    e.preventDefault()
    this.setState(() => ({
      answeredTab: true
    }))
  }
  
  renderQuestions() {
    return this.props.questionIds
      .filter(id => {
      const { authedUser } = this.props
      const { optionOne, optionTwo } = this.props.questions[id]
      const answered = optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser)
      return answered === this.state.answeredTab
    })
      .map(id => (
      <li key={id}>
           <Hidden qid={id}/>
      </li>
    ))
  }
  
  render() {
    const { answeredTab } = this.state
    return (
      <div>
        <div className='tab-container container box'>
          <div className={answeredTab ? 'tab' : 'tab-active'} onClick={e => this.unanswered(e)}>Unaswered Questions</div>
          <div className={answeredTab ? 'tab-active' : 'tab'} onClick={e => this.answered(e)}>Answered Questions</div>
        </div>
        <div className='container box'>
          <ul className='home-list'>
			{this.renderQuestions()}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions }) {
  return {
    authedUser,
    questions,
    questionIds: Object.keys(questions)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Home)