import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import Slider from 'react-slick'
import Markdown from '../Markdown/Markdown'
import Container from '../Container'
import { ReactComponent as Circle } from './circle.svg'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Roadmap.scss'

const releases = [
  { version: '0.1', date: 'Dec 24, 2018' },
  { version: '0.2', date: 'Feb 15, 2019' },
  { version: '0.4', date: 'Apr 17, 2019' },
  { version: '0.5', date: 'May 14, 2019' },
  { version: '0.35', date: 'Sep 25, 2023' },
  { version: '0.36', date: 'Oct 26, 2023' },
]

export default function Roadmap() {
  const [active, setActive] = useState(releases.length - 1)

  const sliderStep = useRef()
  const sliderInfo = useRef()
  const sliderSelect = (index, isInit) => {
    setActive(index)
    if (!isInit) {
      sliderStep.current.slickGoTo(index)
      sliderInfo.current.slickGoTo(index)
    }
  }

  useEffect(() => {
    sliderSelect(releases.length - 1, true)
  }, [])

  const stepSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    currentSlide: active
  }

  const contentSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    draggable: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    currentSlide: active
  }

  return (
    <div className="Roadmap Section-space-top Section-space-bottom">
      <div className="Page-header-text text-center pb-5 text-gradient">
        Roadmap
      </div>

      <Slider {...stepSettings} ref={sliderStep} className="Roadmap-slide">
        <RoadmapItem isStart />
        {releases.map((release, index) =>
          <RoadmapItem
            key={index}
            isActive={index === active}
            date={release.date}
            version={release.version}
            onClick={() => sliderSelect(index)}
          />
        )}
        <RoadmapItem isEnd />
      </Slider>
      <Slider {...contentSettings} ref={sliderInfo}>
        {releases.map((release, index) =>
          <Container key={index} className="mt-4 Roadmap-content-container">
            <RoadmapDetails version={release.version} />
          </Container>
        )}
      </Slider>
    </div>
  )
}

export function RoadmapItem({ isActive, date, version, onClick, isStart, isEnd }) {
  if (isStart || isEnd) {
    return (
      <div className="Roadmap-step">
        <div className={cn('Roadmap-progress', { 'Roadmap-progress-end': isEnd })} />
      </div>
    )
  }

  const width = isActive ? '24' : '16'
  const height = isActive ? '24' : '16'

  return (
    <div className="Roadmap-step" onClick={onClick}>
      <div className="Roadmap-progress" />
      <div className={cn('Roadmap-circle', { 'Roadmap-circle-active': isActive })}>
        <div className="text-grey small">{date}</div>
        <Circle width={width} height={height} role="button" />
        <div className="text-steel-light">Version {version}</div>
      </div>
    </div>
  )
}

function RoadmapDetails({ version }) {
  return (
    <div className="card card-rounded border-0 bg-steel-10 p-4">
      <div className="card-body Roadmap-highlights scroll">
        <Markdown file={require(`../../releases/${version}.md`)} />
      </div>
      <div className="card-footer pt-3">
        <div className="border-top mt-2 pt-2">
          <a href={`https://github.com/horizontalsystems/unstoppable-wallet-android/releases/tag/${version}.0`}
             target="_blank"
             rel="noopener noreferrer"
             className="text-warning small">Android</a>
          &nbsp;&nbsp;
          <a href={`https://github.com/horizontalsystems/unstoppable-wallet-ios/releases/tag/${version}`}
             target="_blank"
             rel="noopener noreferrer"
             className="text-warning small">iOS</a>
        </div>
      </div>
    </div>
  )
}
