// JavaScript for the storefront application
$(document).ready(function () {
  // Add click event listener to the "Add to Cart" button
  $("#addCartButton").click(function () {
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
        alert("Product added to cart!");
      },
      error: function (error) {
        // Handle error (e.g., show an error message)
        alert("Error adding product to cart.");
      },
    });
  });
});
