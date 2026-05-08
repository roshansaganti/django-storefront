// JavaScript for handling cart interactions

function refreshCart() {
  // Implementation for refreshing the cart
  console.log("Cart refreshed"); // Debugging: Check if the function is called

  // Refresh the cart container without reloading the entire page
  $("#cartContainer").load(location.href + " #cartContainer");
}

function refreshSummary() {
  // Implementation for refreshing the summary
  console.log("Summary refreshed"); // Debugging: Check if the function is called

  // Refresh the values in the summary section without reloading the entire page
  $("#subtotalValue").load(location.href + " #subtotalValue");
  $("#taxValue").load(location.href + " #taxValue");
  $("#totalValue").load(location.href + " #totalValue");
}

$(document).ready(function () {
  // Add click event listener to the "Remove from Cart" button
  $("#cartTableBody").on("click", "#removeCartButton", function () {
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
        // Remove the entire table row corresponding to the removed item
        $(`#removeCartButton[data-product-id="${productId}"]`)
          .closest("tr")
          .remove();
        // Check if the cart is empty after removal and refresh the cart
        if ($("#cartTableBody tr").length === 0) refreshCart();
        // Refresh the summary section to reflect the updated cart information
        refreshSummary();
      },
      error: function (error) {
        // Handle error (e.g., show an error message)
      },
    });
    // Re-enable the button after the AJAX request is complete
    $(this).prop("disabled", false);
  });

  // Checkout button click event listener
  $("#checkoutButton").on("click", function () {
    console.log("Checkout button clicked"); // Debugging: Check if the button click is registered
    // Disable the button to prevent multiple clicks
    $(this).prop("disabled", true);
    // Change button text to use spinner and indicate processing
    $(this).html(
      `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
    );
    // Send an AJAX request to proceed to checkout
    $.ajax({
      url: "/checkout/",
      method: "POST",
      data: {
        csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
      },
      success: function (response) {
        // Handle success (e.g., redirect to checkout page)
        // Sleep for 3 seconds
        setTimeout(function () {
          // Clear the cart and refresh the page
          $("#cartTableBody").empty();
          // Check if the cart is empty after removal and refresh the cart
          if ($("#cartTableBody tr").length === 0) refreshCart();
          // Refresh the summary section to reflect the updated cart information
          refreshSummary();
        }, 3000);
      },
      error: function (error) {
        // Handle error (e.g., show an error message)
        console.error("Error occurred while proceeding to checkout:", error);
      },
    });
  });
});
