import React, {PropTypes} from 'react';
import '../components/App.css';

import Loading from './loading';



const TodoItem=(props)=>{
    return (
                <li> <p style={{textDecoration:(props.item.isCompleted?'line-through':'none')}}>{props.item.name}
                <button onClick={(e)=>{
                                        e.preventDefault()
                                        props.onComplete(props.item, props.index);
                                    }}>completed</button>
                <button size="small"onClick={(e)=>{
                                        e.preventDefault()
                                        props.OnDelete(props.item, props.index);
                                    }}>delete</button>
                </p>
                </li>
    );
}
TodoItem.propTypes = {
    item: PropTypes.object.isRequired
    
}
export default TodoItem;
