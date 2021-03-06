import React from 'react';
import './App.css';
import './ShoppingList/ShoppingList.js';
import ShoppingList from "./ShoppingList/ShoppingList";
import ReplacementList from "./ReplacementList/ReplacementList";
import Welcome from "./Welcome/Welcome";
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EventProvider from "./EventBus/EventProvider";

function App() {

    const QontoConnector = withStyles({
                                          alternativeLabel: {
                                              top: 10,
                                              left: 'calc(-50% + 16px)',
                                              right: 'calc(50% + 16px)',
                                          },
                                          active: {
                                              '& $line': {
                                                  borderColor: '#784af4',
                                              },
                                          },
                                          completed: {
                                              '& $line': {
                                                  borderColor: '#784af4',
                                              },
                                          },
                                          line: {
                                              borderColor: '#eaeaf0',
                                              borderTopWidth: 3,
                                              borderRadius: 1,
                                          },
                                      })(StepConnector);

    const useQontoStepIconStyles = makeStyles({
                                                  root: {
                                                      color: '#eaeaf0',
                                                      display: 'flex',
                                                      height: 22,
                                                      alignItems: 'center',
                                                  },
                                                  active: {
                                                      color: '#784af4',
                                                  },
                                                  circle: {
                                                      width: 8,
                                                      height: 8,
                                                      borderRadius: '50%',
                                                      backgroundColor: 'currentColor',
                                                  },
                                                  completed: {
                                                      color: '#784af4',
                                                      zIndex: 1,
                                                      fontSize: 18,
                                                  },
                                              });

    function QontoStepIcon(props) {
        const classes = useQontoStepIconStyles();
        const { active, completed } = props;

        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: active,
                })}
            >
                {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
            </div>
        );
    }

    QontoStepIcon.propTypes = {
        active: PropTypes.bool,
        completed: PropTypes.bool,
    };

    const useColorlibStepIconStyles = makeStyles({
                                                     root: {
                                                         backgroundColor: '#ccc',
                                                         zIndex: 1,
                                                         color: '#fff',
                                                         width: 50,
                                                         height: 50,
                                                         display: 'flex',
                                                         borderRadius: '50%',
                                                         justifyContent: 'center',
                                                         alignItems: 'center',
                                                     },
                                                     active: {
                                                         backgroundImage:
                                                             'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
                                                         boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
                                                     },
                                                     completed: {
                                                         backgroundImage:
                                                             'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
                                                     },
                                                 });

    function ColorlibStepIcon(props) {
        const classes = useColorlibStepIconStyles();
        const { active, completed } = props;

        const icons = {
            1: <SettingsIcon />,
            2: <GroupAddIcon />,
            3: <VideoLabelIcon />,
        };

        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: active,
                    [classes.completed]: completed,
                })}
            >
                {icons[String(props.icon)]}
            </div>
        );
    }

    ColorlibStepIcon.propTypes = {
        active: PropTypes.bool,
        completed: PropTypes.bool,
        icon: PropTypes.node,
    };

    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
        },
        button: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        }
    }));

    function getSteps() {
        return ['Welcome!', 'Make your grocery list!', 'Shop Lift!'];
    }

    function getStepContent(step) {
        const shoppingList = <ShoppingList className={classes.page} />;
        const replacementList = <ReplacementList className={classes.page} />;
        switch (step) {
            case 0:
                return <p className={classes.page}>'Welcome Page'</p>;
            case 1:
                return shoppingList;
            case 2:
                return replacementList;
            default:
                return 'Unknown step';
        }
    }

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className="App">
            <EventProvider>
                <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Button onClick={handleReset} className={classes.button}>
                                Reset
                            </Button>
                        </div>
                    ) : (
                         <div>
                             <Typography className={classes.instructions}>
                                 <Welcome className={classes.page} isVisible={activeStep === 0} />
                                 <ReplacementList className={classes.page} isVisible={activeStep === 2} />
                                 <ShoppingList className={classes.page} isVisible={activeStep === 1} />
                             </Typography>
                             <div>
                                 <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                     Back
                                 </Button>
                                 <Button
                                     variant="contained"
                                     color="primary"
                                     onClick={handleNext}
                                     className={classes.button}
                                 >
                                     {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                 </Button>
                             </div>
                         </div>
                     )}
                </div>
            </EventProvider>
        </div>
    );
}

export default App;
