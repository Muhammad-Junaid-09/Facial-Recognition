import React from 'react';
import TableAll from './table-data';
import {Card, CardBody, CardText} from 'reactstrap';
import 'react-h5-audio-player/lib/styles.css';

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
        }
    }
  
    render() {
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
                                <div  style = {{color: '#737475', fontSize:'16px', padding: '6px', marginBottom: '10px'}}><strong>Customer Profile</strong></div>
                                    <div className= "row">
                                        <div className = "col-4 media media-sm media-list" style = {{textAlign: "center", justifyContent:"center",padding: '10px', margin: '5px', border: '1px solid rgba(57, 117, 225, 0.5)', borderRadius:'5px'}}>
					                        <div  className=" media-center">
						                        <img src="/assets/img/user/user-13.jpg" alt="" className="media-object rounded-corner" />
                                                <div className="media-body p-t-10">
					                                <h5 className="media-heading" style = {{color: '#737475'}}>Ahmed Shah</h5>
                                                    <h6 style = {{color: '#737475'}}>ID # 239982</h6>
				                                </div>
					                        </div>
			                            </div>
                                            
                                        <div className = "col" style = {{display:'block' ,textAlign: "center", justifyContent:"center",paddingTop:'20px'}}>
                                        <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>Gender :</strong> Male</div>
                                        <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>Date of Birth  :</strong> 05/09/1996</div>
                                        <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>CNIC :</strong> 61901-1234567-1</div>
                                        <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>Phone Number :</strong> 0321-9876543</div>
                                        <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>Email ID :</strong> ahmed@gmail.com</div>
                                        </div>

                                    </div>
                                </CardText>

                            </CardBody>
						</Card>
			</div>
            <div className = "m-20">
			<Card className="border-1">
                            <CardBody>
                                <CardText>
                                <div  style = {{color: '#737475', fontSize:'16px', padding: '6px', marginBottom: '10px'}}><strong>Employee Job Details</strong></div>
                                <div className = "col" style = {{display:'block' ,textAlign: "center", justifyContent:"center",paddingTop:'10px',marginTop:'20px', border: '1px solid rgba(57, 117, 225, 0.5)', borderRadius:'5px'}}>
                                        <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>Designation :</strong> Manager</div>
                                        <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>Departmnet  :</strong> Customer Care</div>
                                        <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>Joining Date :</strong> 15-12-2021</div>
                                        <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>Service Time :</strong> 1 month</div>
                                        <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>Email ID :</strong> ahmed@gmail.com</div>
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
  
  const ContactList = () => (
    <div>
      <Sidebar hasOverlay />
    </div>
  )
  
  
export default ContactList;


