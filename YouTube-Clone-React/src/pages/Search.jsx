import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'
import api from '../api/axios'

// 테스트 용이하게 하기 위한 임시 스타일
const PaddingSection = styled.div`
	margin-top: 60px;
	margin-left: 250px;
`

export const getSearchVideos = async (search) => {
	const response = await api.get('/search', {
		params: {
			part: 'snippet',
			maxResults: '20',
			q: search,
			type: 'video',
			regionCode: 'kr',
		},
	})
	return response.data.items
}

function Search() {
	const search = new URLSearchParams(useLocation().search).get('q')
	const [searchVideos, setSearchVideos] = useState([])
	useEffect(() => {
		getSearchVideos(search).then((res) => {
			setSearchVideos(res)
		})
	}, [search])
	return (
		<PaddingSection>
			{searchVideos.map((video) => (
				<div key={video.id.videoId}>
					<Link to={`/video/${video.id.videoId}`}>
						<img src={video.snippet.thumbnails.medium.url} alt="썸네일" />
						<span>{video.snippet.title}</span>
					</Link>
				</div>
			))}
		</PaddingSection>
	)
}

export default Search
