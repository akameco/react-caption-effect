import React, {Component, PropTypes} from 'react';

export default class Figure extends Component {
	constructor(props) {
		super(props);
		this.state = {isHovering: false};
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
	}

	handleMouseOver() {
		this.setState({isHovering: true});
	}

	handleMouseOut() {
		this.setState({isHovering: false});
	}

	render() {
		const {position, width, img} = this.props;
		let {time} = this.props;
		time = time || 0.5;

		let posStyle;
		if (position === 'left' || position === 'right') {
			posStyle = {
				top: 0,
				[position]: this.state.isHovering ? 0 : '-100%'
			};
		} else {
			posStyle = {[position]: this.state.isHovering ? 0 : '-100%'};
		}

		const hoverStyle = this.state.isHovering && {opacity: 1};

		const figcaptionBaseStyle = {
			position: 'absolute',
			width: '100%',
			height: '100%',
			zIndex: 2,
			backgroundColor: 'rgba(0,0,0,.5)',
			transition: `${time}s`,
			opacity: 0,
			textAlign: 'center'
		};

		const divStyle = Object.assign({}, figcaptionBaseStyle, hoverStyle, posStyle);
		const figureStyle = {
			position: 'relative',
			overflow: 'hidden',
			width: width || 300,
			color: 'white'
		};

		const imgStyle = {
			transform: this.state.isHovering ? 'scale(1.2)' : 'scale(1)',
			transition: `${time}s`
		};

		return (
			<figure
				onMouseOver={this.handleMouseOver}
				onMouseOut={this.handleMouseOut}
				style={figureStyle}
				>
				<img src={img} width={width || 300} style={imgStyle}/>
				<figcaption style={divStyle}>
					{this.props.children}
				</figcaption>
			</figure>
		);
	}
}

Figure.propTypes = {
	children: PropTypes.node,
	img: PropTypes.string.isRequired,
	position: PropTypes.string.isRequired,
	time: PropTypes.number,
	width: PropTypes.number
};
