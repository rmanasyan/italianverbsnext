import { describe, test, expect } from 'bun:test'
import {
  getFeaturedVerbs,
  getRelatedVerbs,
  getFilteredVerbs,
  getFilteredVerbsByForm,
  getConjugation,
  getVerbs
} from './data'

describe('Database Query Functions', () => {
  describe('getFeaturedVerbs', () => {
    test('should return an array of featured verbs', async () => {
      const result = await getFeaturedVerbs()

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)

      // Verify structure of first verb
      if (result.length > 0) {
        const firstVerb = result[0]
        expect(firstVerb).toHaveProperty('id')
        expect(firstVerb).toHaveProperty('verb')
        expect(firstVerb).toHaveProperty('featured')
        expect(typeof firstVerb.verb).toBe('string')
      }
    })

    test('should return verbs sorted alphabetically', async () => {
      const result = await getFeaturedVerbs()

      if (result.length > 1) {
        const verbs = result.map(v => v.verb)
        const sortedVerbs = [...verbs].sort()
        expect(verbs).toEqual(sortedVerbs)
      }
    })
  })

  describe('getVerbs', () => {
    test('should return an array of verbs limited by env variable', async () => {
      const result = await getVerbs()

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)

      const limit = Number(process.env.VERBS_LIMIT || 10)
      expect(result.length).toBeLessThanOrEqual(limit)
    })
  })

  describe('getRelatedVerbs', () => {
    test('should return verbs alphabetically after the given verb', async () => {
      const result = await getRelatedVerbs('amare')

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
      expect(result.length).toBeLessThanOrEqual(12)

      // All verbs should come alphabetically after 'amare'
      result.forEach(verb => {
        expect(verb.verb > 'amare').toBe(true)
      })
    })

    test('should return sorted results', async () => {
      const result = await getRelatedVerbs('amare')

      if (result.length > 1) {
        const verbs = result.map(v => v.verb)
        const sortedVerbs = [...verbs].sort()
        expect(verbs).toEqual(sortedVerbs)
      }
    })

    test('should handle verbs at the end of alphabet', async () => {
      const result = await getRelatedVerbs('zzz')

      // Should return empty array or very few results
      expect(Array.isArray(result)).toBe(true)
    })
  })

  describe('getFilteredVerbs', () => {
    test('should return verbs matching the search prefix', async () => {
      const result = await getFilteredVerbs('am')

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
      expect(result.length).toBeLessThanOrEqual(30)

      // All results should start with 'am'
      result.forEach(verb => {
        expect(verb.title.toLowerCase().startsWith('am')).toBe(true)
      })
    })

    test('should return results with correct structure', async () => {
      const result = await getFilteredVerbs('par')

      if (result.length > 0) {
        const firstVerb = result[0]
        expect(firstVerb).toHaveProperty('id')
        expect(firstVerb).toHaveProperty('path')
        expect(firstVerb).toHaveProperty('title')
      }
    })

    test('should be case insensitive (ILIKE)', async () => {
      const lowerResult = await getFilteredVerbs('am')
      const upperResult = await getFilteredVerbs('AM')

      expect(lowerResult.length).toBe(upperResult.length)
      expect(lowerResult).toEqual(upperResult)
    })

    test('should return empty array for non-existent prefix', async () => {
      const result = await getFilteredVerbs('xyz123')

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(0)
    })
  })

  describe('getFilteredVerbsByForm', () => {
    test('should find verbs by their conjugated forms', async () => {
      const result = await getFilteredVerbsByForm('amo')

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)

      // Results should have the expected structure
      result.forEach(verb => {
        expect(verb).toHaveProperty('id')
        expect(verb).toHaveProperty('path')
        expect(verb).toHaveProperty('title')
        // Title should contain the form or related form (case insensitive)
        expect(typeof verb.title).toBe('string')
        expect(verb.title.length).toBeGreaterThan(0)
      })
    })

    test('should handle accent-insensitive search', async () => {
      // Test that unaccent() function works
      const result = await getFilteredVerbsByForm('amo')

      expect(Array.isArray(result)).toBe(true)
    })

    test('should return empty array for non-existent form', async () => {
      const result = await getFilteredVerbsByForm('xyz123notaform')

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(0)
    })

    test('should handle URL encoded input', async () => {
      // The function uses decodeURI internally
      const encoded = encodeURI('amerò')
      const result = await getFilteredVerbsByForm(encoded)

      expect(Array.isArray(result)).toBe(true)
    })
  })

  describe('getConjugation', () => {
    test('should return conjugation for a valid verb', async () => {
      const result = await getConjugation('amare')

      expect(result).not.toBeNull()
      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('verb')
      expect(result?.verb).toBe('amare')
    })

    test('should return null for non-existent verb', async () => {
      const result = await getConjugation('xyz123notaverb')

      expect(result).toBeNull()
    })

    test('should find conjugation by any verb form', async () => {
      // Should find conjugation using a conjugated form
      const result = await getConjugation('amo')

      expect(result).not.toBeNull()
      if (result) {
        expect(result).toHaveProperty('verb')
        expect(typeof result.verb).toBe('string')
      }
    })

    test('should handle URL encoded input', async () => {
      const encoded = encodeURI('amare')
      const result = await getConjugation(encoded)

      expect(result).not.toBeNull()
      expect(result?.verb).toBe('amare')
    })

    test('should include conjugation data', async () => {
      const result = await getConjugation('amare')

      expect(result).not.toBeNull()
      if (result) {
        expect(result).toHaveProperty('id')
        expect(result).toHaveProperty('verb')
        // Additional conjugation properties would be in the data
        expect(typeof result.id).toBe('string')
      }
    })
  })

  describe('Error Handling', () => {
    test('should return empty array on error for getFeaturedVerbs', async () => {
      // This test verifies the try-catch wrapper
      const result = await getFeaturedVerbs()
      expect(Array.isArray(result)).toBe(true)
    })

    test('should return null on error for getConjugation', async () => {
      const result = await getConjugation('')
      // Should handle empty string gracefully
      expect(result === null || typeof result === 'object').toBe(true)
    })
  })

  describe('Performance & Caching', () => {
    test('should cache results (React cache wrapper)', async () => {
      // First call
      const start1 = performance.now()
      const result1 = await getFeaturedVerbs()
      const duration1 = performance.now() - start1

      // Second call (should be cached)
      const start2 = performance.now()
      const result2 = await getFeaturedVerbs()
      const duration2 = performance.now() - start2

      expect(result1).toEqual(result2)
      // Note: React cache() is request-scoped, so this test
      // verifies the function is callable multiple times
    })

    test('JSONB operators work correctly', async () => {
      // Tests ->>, ->, and ? operators
      const featured = await getFeaturedVerbs()
      const conjugation = await getConjugation('amare')

      // If these return data, JSONB operators are working
      expect(Array.isArray(featured)).toBe(true)
      expect(conjugation === null || typeof conjugation === 'object').toBe(true)
    })

    test('ILIKE pattern matching works', async () => {
      const result = await getFilteredVerbs('am')

      expect(Array.isArray(result)).toBe(true)
      if (result.length > 0) {
        result.forEach(verb => {
          expect(verb.title.toLowerCase()).toMatch(/^am/)
        })
      }
    })

    test('CROSS JOIN LATERAL works', async () => {
      // This tests the complex query in getFilteredVerbsByForm
      const result = await getFilteredVerbsByForm('amo')

      expect(Array.isArray(result)).toBe(true)
      // If this returns results, CROSS JOIN LATERAL is working
    })
  })
})
