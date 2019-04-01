/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has a URL', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });
        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a name', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });
    /* This is new test suite named "The menu" */
    describe('The menu', function() {
        const menu = document.querySelector('body').classList;
        /* This test ensures that menu element is
        * hidden by default. You'll have to analyze the HTML and
        * the CSS to determine how we're performing the
        * hiding/showing of the menu element.
        */
        it('hidden by default', function() {
            expect(menu).toContain('menu-hidden');
        });
        /*This test ensures that menu changes
        * visibility when the menu icon is clicked.
        */
        it('change menu visibility when clicked', function() {
            document.querySelector('.menu-icon-link').click();
            if (menu !== 0) {
                expect(menu).not.toContain('menu-hidden');   
            } else if (menu === 0) {
                expect(menu).toContain('menu-hidden');
            }
            document.querySelector('.menu-icon-link').click();
        });
    });
    /* This is a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
         // This test ensures that when the loadFeed
         // * function is called and completes its work, there is at least
         // * a single .entry element within the .feed container.
         // * Once that loadFeed() is a asynchronous function, this test required
         // * the use of Jasmine's beforeEach and asynchronous done() function.
        beforeEach(function(done) {
            setTimeout (function() {
               init(); 
               done();  
            }, 1500); 
        });
        it('loadFeed completes its work', function() {
            const feedSelector = document.querySelectorAll('.feed .entry');
            const countFeedSelector = feedSelector.length;           
            expect(countFeedSelector).toBeGreaterThan(0);
        });
    });      
    /* This is a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         let feed0;
         beforeEach(function(done) {
            loadFeed(0, function() {
                feed0 = document.querySelector('.feed').innerHTML;

                loadFeed(1, function() {
                    done();
                })
            }) 
        });
        it('new feed is loaded by the loadFeed function', function() {
            let feed1 = document.querySelector('.feed').innerHTML;
            expect(feed0).not.toBe(feed1);  
         });
    });
}());