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
                                    <div style = {{color: '#737475', fontSize:'16px', padding: '6px', marginBottom:'10px'}}>Device Status</div>
                                    <div className = "row media media-md media-list" style = {{textAlign: "center", justifyContent:"center",paddingLeft: '10px', margin: '5px'}}>
                                            <div  className=" media-left">
                                                <img src="/assets/img/user/user-13.jpg" alt="" className="media-object rounded-corner" />
                                            </div>
                                        <div className="media-body p-t-10">
                                            <h5 className="media-heading" style = {{color: '#737475', fontSize:'18px', padding: '3px'}}>DRD-X689</h5>
                                            <h6 style = {{color: '#737475', fontSize:'14px', padding: '6px'}}>Device ID : 239982</h6>
                                        </div>
                                    </div>
                                    
                                        
                                            
                                        <div className = "col" style = {{display:'block' ,textAlign: "center", justifyContent:"center",paddingTop:'10px',marginTop:'20px', border: '1px solid rgba(57, 117, 225, 0.5)', borderRadius:'5px'}}>
                                        <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>Temperature :</strong> 89&#176;F</div>
                                        <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>Active Duration  :</strong> 10 minutes</div>
                                        <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>Total Active Duration :</strong> 12 hours 10 minutes</div>
                                        <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>Last Maintenance Date :</strong> 16-12-2021</div>
                                        <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>Storage Capacity :</strong> 10 GB</div>
                                        <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>Total Recordings :</strong> 40</div>
                                        <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>Last Server Transfer :</strong> 20-12-2021</div>
                                        </div>

                                    
                                </CardText>

                            </CardBody>
						</Card>
			</div>
            <div className = "m-20">
			<Card className="border-1">
							
                            <CardBody>
                                <CardText>
                                <div style = {{color: '#737475', fontSize:'16px', padding: '6px', marginBottom:'10px'}}>User Manual</div>
                                <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>1. </strong> Overview</div>
                                <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>2. </strong> Transfer Data</div>
                                <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>3. </strong> Delete Data</div>
                                <div  style = {{color: '#737475', fontSize:'12px', padding: '3px'}}><strong>4. </strong> Reset</div>
								

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
  
  const DeviceStatus = () => (
    <div>
      <Sidebar hasOverlay />
    </div>
  )
  
  
export default DeviceStatus;


