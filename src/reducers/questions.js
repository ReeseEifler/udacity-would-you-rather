import { ADD_QUESTION, ANSWER_QUESTION, RECEIVE_QUESTIONS, UNDO_QUESTION_ANSWER } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION:
      return {
          ...state,
          [action.question.id]: action.question
      }
    case ANSWER_QUESTION: {
      const { authedUser, qid, answer } = action
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
          }
        }
      }
    }
    case UNDO_QUESTION_ANSWER: {
      const { authedUser, qid, answer } = action
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            votes: state.questions[qid][answer].filter(user => user !== authedUser)
          }
        }
      }
    }
    default:
      return state
  }
}