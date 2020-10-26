package com.qa.choonz.dto;

import org.junit.jupiter.api.Test;

import com.qa.choonz.rest.dto.AlbumDTO;

import nl.jqno.equalsverifier.EqualsVerifier;

public class AlbumDTOUnitTest {
	
	@Test 
	public void testEquals() { 
		EqualsVerifier.simple().forClass(AlbumDTO.class).verify(); 
	}
}
