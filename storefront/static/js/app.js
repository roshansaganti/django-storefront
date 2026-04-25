// JavaScript for the storefront application
$(document).ready(function () {
  // Add click event listener to the "Add to Cart" button
  $("#addCartButton").click(function () {
    // Disable the button to prevent multiple clicks
    $(this).prop("disabled", true);
    // Get the product ID from the button's data attribute
    const productId = $(this).data("product-id");
    console.log("Product ID:", productId); // Debugging: Check if the product ID is correct
    // Send an AJAX request to add the product to the cart
    $.ajax({
      url: `/cart/add/${productId}/`, // URL to your Django view that handles adding to cart
      method: "POST",
      data: {
        product_id: productId,
        csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(), // Include CSRF token
      },
      success: function (response) {
        // Handle success (e.g., show a success message or update cart count)
      },
      error: function (error) {
        // Handle error (e.g., show an error message)
      },
    });
    // Re-enable the button after the AJAX request is complete
    $(this).prop("disabled", false);
  });

  // Add click event listener to the "Remove from Cart" button
  $("#removeCartButton").click(function () {
    // Disable the button to prevent multiple clicks
    $(this).prop("disabled", true);
    // Get the product ID from the button's data attribute
    const productId = $(this).data("product-id");
    console.log("Product ID to remove:", productId); // Debugging: Check if the product ID is correct
    // Send an AJAX request to remove the product from the cart
    $.ajax({
      url: `/cart/remove/${productId}/`, // URL to your Django view that handles removing from cart
      method: "POST",
      data: {
        product_id: productId,
        csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(), // Include CSRF token
      },
      success: function (response) {
        // Handle success (e.g., show a success message or update cart count)
      },
      error: function (error) {
        // Handle error (e.g., show an error message)
      },
    });
    // Re-enable the button after the AJAX request is complete
    $(this).prop("disabled", false);
  });
});
