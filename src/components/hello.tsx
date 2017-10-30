import * as React from "react";
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

export interface Props {
    cat?: string
}

export interface PropsUpdate {
    update?: () => void
}

export interface State {
    txt: string
}

export interface StateUpdate {
    a: string,
}

class Hello extends React.Component<Props, State> {   
    
    static propTypes = {
        cat: PropTypes.string
    }

    static defaultProps = {
        cat: 'I am the default Hello'
    }

    constructor(){
        super();
        this.state = {
            txt: 'I am a state'
        };
    }

    update(e: any) {
        this.setState({
            txt: e.target.value
        })

    }

    render() {
        return <div>
            <h2>{this.state.txt}</h2>
            <h3>{this.props.cat}</h3> 
            <Widget update={this.update.bind(this)} />
            {/* <input type="text" onChange={this.update.bind(this)} />          */}

            <hr/>

            <Button>I have the correct text</Button>

            <hr/>

            <MyRequire cat="I did get updated"> </MyRequire>

            <MyRefs />

            <MountWrapper />

        </div>  
    }
}

const Widget = (props: any) => <input type="text" onChange={props.update} />

const Button = (props: any) => <button>{props.children}</button>

class MyRequire extends React.Component<Props> {    

    static propTypes = {
        cat: (props: any, propName: any) => null
    }

    constructor(){
        super();
    }    

    render() {
        return <strong>{this.props.cat}</strong>
    }
}

class MyRefs extends React.Component {

    a: any;

    constructor(){
        super();
        this.state = {
            a: '',
            b: ''
        };
    }

    update(){
        this.setState({
            a: this.a.refs.input.value,
            b: this.refs.b.value
        })
    }

    render() {
        return (<div>
            <h4>References</h4>
            <div>
                <Input update={this.update.bind(this)} ref={component => this.a = component} /> <strong>{this.state.a}</strong>
            </div>
            <div>
                <input type="text" ref="b" onChange={this.update.bind(this)} /> <strong>{this.state.b}</strong>
            </div>            
        </div> )
    }
}

class Input extends React.Component<PropsUpdate> {

    render() {
        return <input type="text" ref="input" onChange={this.props.update} />
    }
}

class MountWrapper extends React.Component {

    mount(){
        ReactDOM.render(<Mounted />, document.getElementById('a'));
    }

    unMount(){
        ReactDOM.unmountComponentAtNode(document.getElementById('a'));
    }

    render(){
        return <div>
            <button onClick={this.mount.bind(this)}>Mount</button>
            <button onClick={this.unMount.bind(this)}>UnMount</button>
            <div id="a"></div>
        </div>
    }
}

const Mounted = () => <div><strong>I was mounted</strong></div>

const App = () => <Hello />

export default App;
