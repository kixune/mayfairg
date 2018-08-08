export default {
	currentPosition: false,
	body: $('body'),

	/**
	 * Repositions the overlay to the middle vertically.
	 */
	 reposition(modal) {
	 	let dialog = modal.find('.modal-dialog');
	 	modal.css('display', 'block');

		// Dividing by two centers the modal exactly, but dividing by three
		// or four works better for larger screens.
		dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
	},

	lockScroll() {
		this.body.css({
			position: 'fixed', // prevents background scrolling
			top: -window.pageYOffset, // prevents background from moving to the top
			left: 0,
			right: 0
		});
	},

	unlockScroll() {
		this.body.css({
			position:'relative',
			top: 'auto',
			left: 'auto',
			right: 'auto'
		});
	},

	init() {
		let thisObj = this;

		$('.modal').on('show.bs.modal', function() {
			let modal = $(this);

			thisObj.reposition(modal);
			thisObj.currentPosition = $(window).scrollTop();
			thisObj.lockScroll();
		})
		.on('hide.bs.modal', () => {
			this.unlockScroll();
			// Brings user back to the position where they open the overlay
			window.scrollTo(0, this.currentPosition);
		});

		// Reposition when the window is resized
		$(window).on('resize', () => {
			$('.modal:visible').each(this.reposition);
		});
	}
}
