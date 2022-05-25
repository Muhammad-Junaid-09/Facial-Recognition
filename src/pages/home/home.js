import React from 'react';
import TableAll from './table-data';
import {Card, CardBody, CardText} from 'reactstrap';


import './index.scss'


const SidebarUI = ({ isOpen, ...rest }) => {
    const classes = [
      'Sidebar',
      isOpen ? 'is-open' : '',
    ]
  
    return (
      <div aria-hidden={!isOpen} className={classes.join(' ')} {...rest} />
    )
  }
  
  SidebarUI.Overlay = props => <div className="SidebarOverlay" {...props} />
  
  SidebarUI.Content = ({ width = '30rem', isLeft = false, ...rest }) => {
    const classes = [
      'SidebarContent',
      isLeft ? 'is-left' : '',
    ]
    const style = {
      width,
      height: '100%',
      top: 0,
      left: isLeft ? `-${width}` : 'auto',
      right: !isLeft ? `-${width}` : 'auto',
    }
    
    return (
      <div
        className={classes.join(' ')}
        style={style}
        {...rest}
       />
    )
  }
  
  
  class Sidebar extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        isOpen: props.isOpen,
        selected: null,
        originalData: '',
        path: '',
        pathArray: [],
      }
      
      this.openSidebar = this.openSidebar.bind(this)
    }
    
    openSidebar(isOpen = true) {
      this.setState({ isOpen })
    }

    handleCallback = (childData) =>{
        if (childData !== null && childData !== undefined ) {
            this.setState({isOpen : true});
            this.setState({originalData: childData.original},()=> console.log(this.state.originalData))
            //import ('../../audio/SoundHelix-Song-1.mp3')
        }
    }
  
    render() {

      //let path = "../../audio/SoundHelix-Song-1.mp3"
      //let path = require("../../audio/SoundHelix-Song-1.mp3");
      //let audio = new Audio(path);
      const { isOpen } = this.state
      const { hasOverlay, isLeft } = this.props
      return (
        <SidebarUI isOpen={isOpen}>
          
          <TableAll parentCallback = {this.handleCallback}/>
          <SidebarUI.Content isright={isLeft}>
          <div style = {{marginTop: '80px'}}>


          <div className = "m-20">
			<Card className="border-1">
                            <CardBody>
                                <CardText>
                                <div  style = {{color: '#737475', fontSize:'16px', padding: '6px', marginBottom: '10px'}}><strong>Attandance Image</strong></div>
                                <img 
                                            style = {{display:'block',width:'50%',marginLeft:'auto',marginRight:'auto' ,objectFit: 'cover',border: '5px solid rgba(57, 117, 225, 0.5)', borderRadius:'5px'}}
                                            src={"data:image/png;base64," +  this.state.originalData.face}
                                            alt="..."
                                        />
                                   
                                </CardText>

                            </CardBody>
						</Card>
			</div>
				
            <div className = "m-20">
			<Card className="border-1">
                            <CardBody>
                                <CardText>
                                    <div className= "row">
                                       
                                            
                                        <div className = "col" style = {{display:'block' ,textAlign: "center", justifyContent:"center",paddingTop:'20px'}}>
                                        <div  style = {{color: '#737475', fontSize:'16px', padding: '3px'}}><strong>Name :</strong> {this.state.originalData.name}</div>
                                        <div  style = {{color: '#737475', fontSize:'16px', padding: '3px'}}><strong>Roll No.  :</strong> {this.state.originalData.roll_no}</div>
                                        <div  style = {{color: '#737475', fontSize:'16px', padding: '3px'}}><strong>Branch :</strong> {this.state.originalData.branch}</div>
                                        <div  style = {{color: '#737475', fontSize:'16px', padding: '3px'}}><strong>Camera ID. :</strong> {this.state.originalData.camera_id}</div>
                                        
                                        </div>

                                    </div>
                                </CardText>

                            </CardBody>
						</Card>
			</div>
			
		            </div>
          </SidebarUI.Content>
          {hasOverlay ? <SidebarUI.Overlay onClick={() => this.openSidebar(false)} /> : false}
      </SidebarUI>
      )
    }
  }
  
  const Home = () => (
    <div>
      <Sidebar hasOverlay />
    </div>
  )
  
  
export default Home;


